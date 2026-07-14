#!/bin/bash

REPO="Blinkzoe/PasswordManagment"
FOLDER="github-stats"
DATE=$(date +%F)

mkdir -p $FOLDER

echo "=============================="
echo " GitHub Traffic Report"
echo " Repo: $REPO"
echo " Date: $DATE"
echo "=============================="

# Obtener datos actuales

gh api repos/$REPO/traffic/views \
> $FOLDER/views-$DATE.json

gh api repos/$REPO/traffic/clones \
> $FOLDER/clones-$DATE.json


# Buscar archivo anterior

PREVIOUS=$(ls $FOLDER/views-*.json 2>/dev/null | grep -v $DATE | tail -1)


if [ -z "$PREVIOUS" ]; then

    echo ""
    echo "No previous data found."
    echo "Current data saved."

else

    echo ""
    echo "Comparing with:"
    echo "$PREVIOUS"


    CURRENT_VIEWS=$(jq '.count' $FOLDER/views-$DATE.json)
    OLD_VIEWS=$(jq '.count' $PREVIOUS)

    CURRENT_UNIQUES=$(jq '.uniques' $FOLDER/views-$DATE.json)
    OLD_UNIQUES=$(jq '.uniques' $PREVIOUS)


    VIEW_DIFF=$((CURRENT_VIEWS - OLD_VIEWS))
    UNIQUE_DIFF=$((CURRENT_UNIQUES - OLD_UNIQUES))


    echo ""
    echo "Views:"
    echo " Previous: $OLD_VIEWS"
    echo " Current : $CURRENT_VIEWS"
    echo " Difference: $VIEW_DIFF"


    echo ""
    echo "Unique visitors:"
    echo " Previous: $OLD_UNIQUES"
    echo " Current : $CURRENT_UNIQUES"
    echo " Difference: $UNIQUE_DIFF"

fi


echo ""
echo "Latest files:"
ls -lh $FOLDER/*$DATE.json