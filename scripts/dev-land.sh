#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

branch_name=`git branch | grep \* | cut -d ' ' -f2`

if [ ${branch_name} -eq "master" ]; then
    printf "${RED}Please check out another branch!${NC}"
    exit 1
fi

printf "${GREEN}On branch ${branch_name}${NC}\n"
printf "${GREEN}Start Landing${NC}\n"

printf "${GREEN}Checking workspace status${NC}\n"
git diff-index --quiet HEAD --

if [ $? -ne 0 ]; then
    printf "${RED}Workspace is not clean yet!${NC}\n"
    exit 1
fi

printf "${GREEN}Rebasing master ...${NC}\n"
git rebase origin master

if [ $? -ne 0 ]; then
    printf "${RED}Rebasing failed!${NC}\n"
    exit 1
fi

printf "${GREEN}Checking out master ...${NC}\n"
git checkout master

if [ $? -ne 0 ]; then
    printf "${RED}Checking out master failed!${NC}\n"
    exit 1
fi

printf "${GREEN}Merging files ...${NC}\n"
git merge --ff-only ${branch_name}

if [ $? -ne 0 ]; then
    printf "${RED}Merge conflicts!${NC}\n"
    exit 1
fi

printf "${GREEN}Pushing to master!${NC}\n"
git push -u origin master
if [ $? -ne 0 ]; then
    printf "${RED}Updating master failed!${NC}\n"
    exit 1
fi

printf "${GREEN}Delete branch ...${NC}\n"
git branch -D ${branch_name}

printf "${GREEN}Landing complete!${NC}\n"
