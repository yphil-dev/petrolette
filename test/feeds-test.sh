#!/usr/bin/env bash

read -e -p "Feeds file to check: " -i "../public/js/default-feeds.json" FEEDSFILE

if [[ $FEEDSFILE =~ .*\.(js$|json$) ]]; then
		list=`jq '.[] | .[]' $FEEDSFILE | jq --raw-output '.[] | .[] .url' 2> /dev/null`
else
		list=$(< $FEEDSFILE)
fi

while IFS= read -r URL; do
		STATUS=`curl -LIs $URL | head -n 1|cut -d$' ' -f2`
		if [ "$STATUS" != "200" ] ; then
				echo "$URL is $STATUS"
		fi
done <<< "$list"
