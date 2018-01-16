import os
import json

if __name__ == '__main__':
    if '/Users/victor/Documents' in os.getcwd():
        print('Updating package...', end='')
        with open('./package.json', 'r') as f:
            obj = json.load(f)
        
        # obj['homepage'] = 'http://vict0rsch.github.io/oop/react'

        with open('./package.json', 'w') as f:
            json.dump(obj, f)
        print('Ok')
    else:
        print('Ignoring package update.')