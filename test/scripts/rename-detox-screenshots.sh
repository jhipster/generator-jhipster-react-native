# workaround for recent detox changes that include < and > in the filename
# this is refused by the github artifact uploader as an invalid filename
cd ../client/.artifacts
find . -type f -name '*.png' | while read FILE ; do
    newfile=$FILE
    newfile="$(echo ${newfile} |sed -e 's/\</_/')" ;
    newfile="$(echo ${newfile} |sed -e 's/\</_/')" ;
    newfile="$(echo ${newfile} |sed -e 's/\>/_/')" ;
    newfile="$(echo ${newfile} |sed -e 's/\>/_/')" ;
    mv "${FILE}" "${newfile}" ;
done
