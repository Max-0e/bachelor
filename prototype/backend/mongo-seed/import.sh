ls -1 *.json | sed 's/.json$//' | while read col; do
    mongoimport --host mongodb --drop --db dev -c $col < $col.json --jsonArray;
done
