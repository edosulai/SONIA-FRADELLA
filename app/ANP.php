<?php

namespace App;

class ANP
{
    protected $patients = [];
    protected $criteria = [];
    protected $criteriaWeights = [];
    protected $influenceMatrix = [];

    public function __construct(array $patients, array $criteria, array $criteriaWeights, array $influenceMatrix)
    {
        $this->patients = $patients;
        $this->criteria = $criteria;
        $this->criteriaWeights = $criteriaWeights;
        $this->influenceMatrix = $influenceMatrix;
    }

    public function getPriorityPatients()
    {
        // Hitung nilai global priority (GP) untuk setiap kriteria pemilihan pasien
        $totalWeights = array_sum($this->criteriaWeights);
        $globalPriorities = array_map(function ($weight) use ($totalWeights) {
            return $weight / $totalWeights;
        }, $this->criteriaWeights);

        // Hitung nilai priority weight (PW) untuk setiap pasien
        $priorityWeights = [];
        foreach ($this->influenceMatrix as $patient) {
            $patientPriority = 0;
            foreach ($patient as $i => $influence) {
                $patientPriority += $influence * $globalPriorities[$i];
            }
            $priorityWeights[] = $patientPriority;
        }

        // Hitung nilai normalisasi (N) untuk setiap pasien
        $totalPriorityWeights = array_sum($priorityWeights);
        $normalization = array_map(function ($weight) use ($totalPriorityWeights) {
            return $weight / $totalPriorityWeights;
        }, $priorityWeights);

        // Mengembalikan pasien terprioritas untuk perawatan
        $patientsPriority = [];
        foreach ($normalization as $i => $priority) {
            $patientsPriority[] = [
                'patient' => $this->patients[$i],
                'priority' => $priority
            ];
        }

        // Mengurutkan pasien berdasarkan prioritas
        usort($patientsPriority, function ($a, $b) {
            return $b['priority'] <=> $a['priority'];
        });

        // Mengembalikan seluruh pasien beserta prioritasnya
        return $patientsPriority;
    }
}
