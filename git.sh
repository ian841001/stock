cd /root/stock
rm -r insert
rm -r update
rm -r delete

cp -r ../test/* ./
git add -A .
git commit -m init
git push
