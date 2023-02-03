<?php

namespace App;

class MinMaxScaler
{
    private $min = 0;
    private $scale = 1;
    private $fit = false;

    public function fit($data)
    {
        if (is_numeric($data[array_keys($data)[0]])) {
            $this->min = min($data);
            $this->scale = max($data) - $this->min;
        } else if (is_array($data[array_keys($data)[0]])) {
            $flat_data = array();
            foreach ($data as $row) {
                foreach ($row as $col) {
                    array_push($flat_data, $col);
                }
            }
            $this->min = min($flat_data);
            $this->scale = max($flat_data) - $this->min;
        } else {
            return back()->withErrors(['error_message' => 'data type not supported']);
        }
        $this->fit = true;
        return true;
    }

    public function transform($data)
    {
        if (!$this->fit) {
            return back()->withErrors(['error_message' => 'fit must be called before transform']);
        }
        if (is_numeric($data[array_keys($data)[0]])) {
            $scaled = [];
            foreach ($data as $key => $value) {
                array_push($scaled, ($value - $this->min) / $this->scale);
            }
            return $scaled;
        } else if (is_array($data[array_keys($data)[0]])) {
            $transformed_data = array();
            foreach ($data as $key => $row) {
                $transformed_row = array();
                foreach ($row as $key => $col) {
                    array_push($transformed_row, ($col - $this->min) / $this->scale);
                }
                array_push($transformed_data, $transformed_row);
            }
            return $transformed_data;
        } else {
            return back()->withErrors(['error_message' => 'data type not supported']);
        }
    }

    public function inverse_transform($data)
    {
        if (!$this->fit) {
            return back()->withErrors(['error_message' => 'fit must be called before transform']);
        }
        if (is_numeric($data[array_keys($data)[0]])) {
            return $data * $this->scale + $this->min;
        } else if (is_array($data[array_keys($data)[0]])) {
            $inversed_data = array();
            foreach ($data as $row) {
                $inversed_row = array();
                foreach ($row as $col) {
                    array_push($inversed_row, $col * $this->scale + $this->min);
                }
                array_push($inversed_data, $inversed_row);
            }
            return $inversed_data;
        } else {
            return back()->withErrors(['error_message' => 'data type not supported']);
        }
    }
}
