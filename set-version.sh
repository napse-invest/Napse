TAG_NAME=$(sed -n 's/^# \[//p' CHANGELOG.md | head -n 1 | sed 's/].*$//')
python3 <<END
import json
import os

def update_version(file_path, tag_name):
    with open(file_path, 'r') as f:
        data = json.load(f)
        data['version'] = tag_name
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
update_version('package.json', '$TAG_NAME')
update_version(os.path.join('desktop-app', 'package.json'), '$TAG_NAME')
END
