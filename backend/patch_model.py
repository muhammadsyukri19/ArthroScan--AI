import zipfile
import json
import os
import shutil

model_path = 'artifacts/best_model.keras'
tmp_dir = 'artifacts/tmp_keras_extract'

if os.path.exists(tmp_dir):
    shutil.rmtree(tmp_dir)

# Extract
with zipfile.ZipFile(model_path, 'r') as z:
    z.extractall(tmp_dir)

config_path = os.path.join(tmp_dir, 'config.json')

# Parse JSON and remove quantization_config
with open(config_path, 'r', encoding='utf-8') as f:
    config_data = json.load(f)

def remove_quant_config(d):
    if isinstance(d, dict):
        if 'quantization_config' in d:
            del d['quantization_config']
        for k, v in d.items():
            remove_quant_config(v)
    elif isinstance(d, list):
        for item in d:
            remove_quant_config(item)

remove_quant_config(config_data)

with open(config_path, 'w', encoding='utf-8') as f:
    json.dump(config_data, f)

# Backup old model just in case (only if not already backed up)
if not os.path.exists(model_path + '.bak'):
    os.rename(model_path, model_path + '.bak')
else:
    os.remove(model_path)

# Re-zip
shutil.make_archive(model_path.replace('.keras', ''), 'zip', tmp_dir)
os.rename(model_path.replace('.keras', '.zip'), model_path)

shutil.rmtree(tmp_dir)
print("Model patched successfully.")
