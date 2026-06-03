#!/bin/bash
# Simple runner for Kaggle notebook/terminal
# Usage: edit DATASET_NAME to your uploaded Kaggle dataset name or set DATA_DIR env

DATASET_NAME="your-dataset-name"  # <-- ganti ini jika perlu
if [ -z "$DATA_DIR" ]; then
  export DATA_DIR="/kaggle/input/$DATASET_NAME"
fi

echo "Using DATA_DIR=$DATA_DIR"
python train.py --data-dir "$DATA_DIR" --batch-size 32 --epochs 20
