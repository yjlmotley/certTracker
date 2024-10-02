#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

# pipenv run upgrade
pipenv run reset_db_prod
