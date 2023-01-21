<?php

use App\ANP;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistranController;
use App\MinMaxScaler;
use App\Models\Pasien;
use App\Models\Unit;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {

    Route::get('/dokter', [DokterController::class, 'index'])->name('dokter');
    Route::get('/dokter/new', [DokterController::class, 'create'])->name('dokter.new');
    Route::post('/dokter/new', [DokterController::class, 'store'])->name('dokter.new');
    Route::get('/dokter/{id}', [DokterController::class, 'edit'])->name('dokter.edit');
    Route::patch('/dokter/{id}', [DokterController::class, 'update'])->name('dokter.edit');
    Route::delete('/dokter/{id}', [DokterController::class, 'destroy'])->name('dokter.delete');

    Route::get('/registran', [RegistranController::class, 'index'])->name('registran');
    Route::get('/registran/new', [RegistranController::class, 'create'])->name('registran.new');
    Route::post('/registran/new', [RegistranController::class, 'store'])->name('registran.new');
    Route::get('/registran/{id}', [RegistranController::class, 'edit'])->name('registran.edit');
    Route::patch('/registran/{id}', [RegistranController::class, 'update'])->name('registran.edit');
    Route::delete('/registran/{id}', [RegistranController::class, 'destroy'])->name('registran.delete');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', function () {
        // return Inertia::render('Welcome', [
        //     'canLogin' => Route::has('login'),
        //     'canRegister' => Route::has('register'),
        //     'laravelVersion' => Application::VERSION,
        //     'phpVersion' => PHP_VERSION,
        // ]);

        return redirect(route('dashboard'));
    });

    Route::get('/dashboard', [PasienController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/new', [PasienController::class, 'create'])->name('dashboard.new');
    Route::post('/dashboard/new', [PasienController::class, 'store'])->name('dashboard.new');
    Route::get('/dashboard/anp', function (Request $request) {
        return Inertia::render('Pasien/FormANP', [
            'title' => 'Form Sorting ANP',
            'unit' => Pasien::selectRaw('units.id, units.jenis_unit, count(units.jenis_unit) as banyak_jenis_unit')
                ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
                ->join('unit_pasiens', 'pasiens.id', '=', 'unit_pasiens.pasien_id')
                ->join('units', 'unit_pasiens.unit_id', '=', 'units.id')
                ->groupBy('units.id', 'units.jenis_unit')
                ->get(),
            'ageRange' => Pasien::selectRaw('max(registrans.umur) as max_umur, min(registrans.umur) as min_umur')
                ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
                ->join('unit_pasiens', 'pasiens.id', '=', 'unit_pasiens.pasien_id')
                ->join('units', 'unit_pasiens.unit_id', '=', 'units.id')
                ->first()
        ]);
    })->name('dashboard.anp');
    Route::post('/dashboard/anp', function (Request $request) {
        $queryPasien  = Pasien::selectRaw("registrans.no_kartu, max(registrans.umur) as umur, concat('unit', units.id) as unit_ke, count(units.jenis_unit) as banyak_jenis_unit")
            ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
            ->join('unit_pasiens', 'pasiens.id', '=', 'unit_pasiens.pasien_id')
            ->join('units', 'unit_pasiens.unit_id', '=', 'units.id')
            ->groupBy('registrans.no_kartu', 'units.jenis_unit', 'units.id')
            ->orderBy('registrans.no_kartu')
            ->get()->toArray();

        $datas = $request->all();

        $result = [];
        $units = Unit::selectRaw("concat('unit', units.id) as unit_ke")
            ->get()->map(function ($unit) {
                return $unit["unit_ke"];
            })->toArray();

        foreach ($queryPasien as $qr) {
            $key = array_search($qr['no_kartu'], array_column($result, 'no_kartu'));
            if ($key === false) {
                $data = [
                    "no_kartu" => $qr['no_kartu'],
                    "umur" => $qr['umur'],
                ];
                foreach ($units as $unit) {
                    $data[$unit] = 0;
                }
                $data[$qr['unit_ke']] = $qr['banyak_jenis_unit'];
                $result[] = $data;
            } else {
                $result[$key][$qr['unit_ke']] = $qr['banyak_jenis_unit'];
            }
        }

        $newResult = [];
        foreach ($result as $item) {
            $no_kartu = $item["no_kartu"];
            unset($item["no_kartu"]);
            $newResult[$no_kartu] = $item;
        }

        $scalerDataset = new MinMaxScaler();
        $scalerDataset->fit($newResult);
        $scalerDatasetScalled = $scalerDataset->transform($newResult);

        $scalerInput = new MinMaxScaler();
        $scalerInput->fit($datas);
        $scalerInputScalled = $scalerInput->transform($datas);

        $anp = new ANP(collect($result)->map(function ($each) {
            return $each["no_kartu"];
        })->toArray(), collect($datas)->keys()->toArray(), $scalerInputScalled, $scalerDatasetScalled);

        $anpResult = $anp->getPriorityPatients();

        $gruopedPasien  = Pasien::selectRaw("
                registrans.nama_pasien,
                registrans.nama_kepala_keluarga,
                registrans.no_kartu,
                registrans.umur,
                registrans.jenis_kelamin,
                status_pasiens.status
            ")
            ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
            ->join('status_pasiens', 'registrans.status_id', '=', 'status_pasiens.id')
            ->groupBy("registrans.nama_pasien", "registrans.nama_kepala_keluarga", "registrans.no_kartu", "registrans.umur", "registrans.jenis_kelamin", "status_pasiens.status")
            ->orderBy('registrans.no_kartu')
            ->get()->toArray();

        $endResult = [];
        foreach ($gruopedPasien as $key2 => $value2) {
            foreach ($anpResult as $key1 => $value1) {
                if ($value1["patient"] === $value2["no_kartu"]) {
                    $endResult[] = array_merge($value2, ["priority" => $value1["priority"]]);
                }
            }
        }

        return Inertia::render('Pasien/ResultANP', [
            'title' => 'Hasil Sorting ANP',
            'anp' => $endResult
        ]);
    })->name('dashboard.anp');
    Route::get('/dashboard/{id}', [PasienController::class, 'edit'])->name('dashboard.edit');
    Route::patch('/dashboard/{id}', [PasienController::class, 'update'])->name('dashboard.edit');
    Route::delete('/dashboard/{id}', [PasienController::class, 'destroy'])->name('dashboard.delete');
});

require __DIR__ . '/auth.php';
