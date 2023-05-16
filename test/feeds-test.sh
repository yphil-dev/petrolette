#!/usr/bin/env bash

list=`jq '.[] | .[]' ../public/js/default-feeds.json | jq --raw-output '.[] | .[] .url' 2> /dev/null`

while IFS= read -r URL; do
		STATUS=`curl -LIs $URL | head -n 1|cut -d$' ' -f2`
		if [ "$STATUS" != "200" ] ; then
				echo "$URL is $STATUS"
		fi
done <<< "$list"
