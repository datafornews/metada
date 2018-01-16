import json


def nested_set(dic, keys, value):
    for key in keys[:-1]:
        dic = dic.setdefault(key, {})
    dic[keys[-1]] = value


def update_locale(file_sets):
    """
        Takes a text file, reformat it in 1 line (with "\n"s ) and adds it to 
        global.locale.json under the appropriate keys. Keys are created on the 
        fly if they do not exist (see nested_set() )

        Args:
            file_sets: dict, keys 'names' and 'locale_keys'
                names is the list of files to be 1-lined and added to global.locale.json's 'locale_keys'
        Returns:
            None: overwrites globale_locale_location

    """

    globale_locale_location = './src/static/texts/global.locale.json'
    text_location = './src/static/texts/'

    with open(globale_locale_location) as f:
        global_locale = json.load(f)

    for file_set in file_sets:
        new_value = []
        for file_name in file_set['names']:
            print(file_name, '...', end='')
            myFile = text_location + file_name
            with open(myFile, 'r') as f:
                lines = f.readlines()
            new_line = ''.join(lines)
            new_value.append(new_line)
        nested_set(global_locale, file_set['locale_keys'], new_value)

    with open(globale_locale_location, 'w') as f:
        json.dump(global_locale, f)

if __name__ == '__main__':

    file_sets = [
        {
            'names': ['intent/intentEn.md', 'intent/intentFr.md'],
            'locale_keys': ['home', 'intentPaperMd']
        },
        {
            'names': ['extension/extensionEn.md', 'extension/extensionFr.md'],
            'locale_keys': ['home', 'extensionPaperMd']
        },
    ]

    update_locale(file_sets)
