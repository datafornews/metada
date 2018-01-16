import os
import json

if __name__ == '__main__':
    print('Writing new index.html... ', end='')
    with open('./build/index.html', 'r') as f:
        lines = f.readlines()
    lines[0] = lines[0].replace('"/', '"./')
    with open('./build/index.html', 'w') as f:
        f.write(lines[0])
    print('OK')