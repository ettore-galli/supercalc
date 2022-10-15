clear

# Node path
NODEDIR=node_modules/.bin
NODEPATH=$(pwd)/$NODEDIR
export PATH=$PATH:$NODEPATH

# Show settings
echo $NODEDIR
echo $NODEPATH
echo PATH=$PATH
echo

