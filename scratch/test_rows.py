# Script to generate the comprehensive khel_record_editor.html
import json

with open(r'c:\Users\pmsrbl\Desktop\pmsrbl\initial_table_rows.json', 'r', encoding='utf-8') as f:
    rows = json.load(f)

# Let's inspect the data
print(f"Total rows: {len(rows)}")
