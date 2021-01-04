# waste-sorting-helper-client
Front end (WeChat app) for project "Research on campus garbage sorting and Recycling".  
See also: [waste-sorting-helper-server](https://github.com/charlie0129/waste-sorting-helper-server).

- Littering History Retrieval
    - [x] Weight
    - [x] Category
    - [x] Rubbish bin ID
    - [x] Date
- User Credit
    - [ ] A user gains credits by correctly classifying the waste and loses his credits if not.
    - [ ] A threshold on the total weight of wastes is set for every user and is reset every week. Exceeding the threshold will cause the user to lose his credits.
- Information on Installed Rubbish Bins
    - [ ] Location
    - [ ] Full or not

## How to run this project

1. Clone this repository

   `https://github.com/charlie0129/waste-sorting-helper-client.git`

2. Install Taro

   ```shell
   npm i -g @tarojs/cli
   ```
   
3. Install dependencies

   ```shell
cd waste-sorting-helper-client
   npm install
   ```
   
4. Build & run

    ```shell
    taro build --type weapp
    ```
5. Open `Wechat Devtools` and run the project at `/dist`

