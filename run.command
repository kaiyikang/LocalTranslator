#!/bin/bash
cd "$(dirname "$0")"

trap "exit" INT

npm run dev

exit