#! /bin/bash

# crontab, everyday at midnight
# 0 0 * * * /path/to/script.sh

PGDUMP='/usr/bin/pg_dump'
PSQL='/usr/bin/psql'

DB_NAME='espresso'
DATETIME=$(date "+%Y-%m-%d+%T")
BACKUPFILE=$DB_NAME-$DATETIME
BACKUPFOLDER='/var/backups/postgres'

# Number of days to keep
TTL=7

#create backup folder
mkdir -p $BACKUPFOLDER

# Create a backup
if pg_dump -j 8 -Fc  $DB_NAME > $BACKUPFOLDER/$BACKUPFILE ; then
   echo 'Sql dump created'
else
   echo 'pg_dump failed to dump file'
   exit
fi

# Delete old backups 
find $BACKUPFOLDER -mtime +$TTL -delete