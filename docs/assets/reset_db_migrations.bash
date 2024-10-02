rm -R -f ./migrations &&
pipenv run init &&
dropdb -h dpg-crtlr5dds78s73et3ll0-a -U postgresql_trapezoidal_42170_outy_user postgresql_trapezoidal_42170_outy || true &&
createdb -h dpg-crtlr5dds78s73et3ll0-a -U postgresql_trapezoidal_42170_outy_user postgresql_trapezoidal_42170_outy || true &&
psql -h dpg-crtlr5dds78s73et3ll0-a -U postgresql_trapezoidal_42170_outy_user -d postgresql_trapezoidal_42170_outy -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade


# postgresql://postgresql_trapezoidal_42170_outy_user:8alOeLT6u2KXM2gzUECwPOFyiAP1pIec@dpg-crtlr5dds78s73et3ll0-a/postgresql_trapezoidal_42170_outy