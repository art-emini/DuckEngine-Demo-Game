echo "Compiling"
tsc
echo "Compiled"
echo "Bundling"
parcel build public/index.html
echo "Done"