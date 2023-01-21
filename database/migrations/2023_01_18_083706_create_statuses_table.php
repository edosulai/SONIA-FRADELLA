<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pasien');
            $table->string('nama_kepala_keluarga');
            $table->string('no_telp');
            $table->string('nik');
            $table->integer('umur');
            $table->text('alamat');
            $table->enum('jenis_kelamin', ['laki-laki', 'perempuan']);
            $table->enum('status', ['umum', 'jkm', 'bpjs']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statuses');
    }
};
