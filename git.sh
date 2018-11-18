rm -r insert
rm -r update
rm -r delete

cp -r ../test/* ./
git add .
git add -u .
git commit -m init
git push
