#!/usr/bin/env bash

# if [ ! -z $1 ] ; then
# 		FEEDSFILE=$1
# else
# 		echo "No arguments were provided"
# 		exit 1
# fi

read -e -p "Feeds file to check: " -i "../public/js/default-feeds.json" FEEDSFILE

list=`jq '.[] | .[]' $FEEDSFILE | jq --raw-output '.[] | .[] .url' 2> /dev/null`

while IFS= read -r URL; do
		STATUS=`curl -LIs $URL | head -n 1|cut -d$' ' -f2`
		if [ "$STATUS" == "404" ] ; then
				echo "$URL"
		fi
done <<< "$list"
