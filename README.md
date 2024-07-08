# kalypso-server

##### .env file :

```
RPC=https://arb-sepolia.g.alchemy.com/v2/****
PRIVATE_KEY=***********fcedffecda5c639568a869e90
PORT=3030
API_KEY=$2a$12$pDBhELXDyqW3CQj9PUvTTuITUjNAn61Y7UNlrWfcmrbJZfwko7Dxu
SERVER_MODE=DEV  #There are two options, DEV and PROD, using PROD enables API key authentication.
PROOF_REWARD=14500000000000000000
MARKET_ID=19 #Market used for avail proof generation
```

`Note : If (PROD) SERVER_MODE is provided, please provide a (api-key) in the request headers.`

#### Start the server

```
npm start
```

#### Creating ask and getting execution

#### For public authorization

##### Method: POST

```
http://localhost:3030/proveTx
```

##### Body (raw)

```
{
    "public": "0u64",
    "secret": {
        "requests": [
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "mint_public",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "1884298325990663985098694436499169409831687479021778131930168571738259806343field"
                    },
                    {
                        "type": "public",
                        "id": "4483058636869781606780813789255111483938650756560504340964801378720475347302field"
                    }
                ],
                "inputs": [
                    "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                    "4u64"
                ],
                "signature": "sign1p9ewe04p3wa47vq7qd0qultjq0euwee4mn2dq3u9e60edyr5nyphzleafvpmf4yyumah6njfqlfun56qa3q8paa67zslg7y0874pxqmy2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq694ll97",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "2201646823117191012317630449916305516728164467914342252604330416562717619480field",
                "tcm": "2206522099898335302100496120686031519100001456103818204430116646871569233630field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "verify_balance",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "4533086632749708976596820511833312240667581088597429166606436539705000386843field"
                    }
                ],
                "inputs": [
                    "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                ],
                "signature": "sign1jd9ygyez22qand4ydj4n2d39gjew5s8h842aqht0pjhqw2ggyvq8th3zk47dfmmhcvvntk8fngas7a6a99ppk6awhwmlp8r89urwqqty2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6fps35l",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "8108716077927838018922473196989844011159972715484799887573953269889173685869field",
                "tcm": "3695541206933324924125198290162224984990308027350393768742962971228222879340field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "transfer_relayer",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "1467822955310890735332745644455943632121685868139037023499415056868662063712field"
                    },
                    {
                        "type": "public",
                        "id": "339154276910150706603006507495213926013747432229383971534733013368344136890field"
                    }
                ],
                "inputs": [
                    "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                    "1u64"
                ],
                "signature": "sign1gehgg2gkchxzkgv85rdxucfgvusqztdx6ytrgz89jafvn44kkuqw5a7xcevmsk2j0p2xqyvqr8a35u2ng4c6agqzsfdj9hhtterrsqty2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq695qfjt",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "7166645465746498446116990762599167730007758197191374594268008592941055158340field",
                "tcm": "80051728258119477824118467086136336417783625081986424163510437832566443487field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "fees.aleo",
                "function": "fees",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "1283343599623892431850927547128781715235469395194148109241174602466664293953field"
                    }
                ],
                "inputs": [
                    "1u64"
                ],
                "signature": "sign18fg09qzm98888l6vcc9wqvrfgxwqmraygqtha6s8pgpqcfcz2cpvud0627tfmqsxgrcdce9d9ll8e6v3xa9rzzu2rvhgng0sllkespry2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6tyvnwy",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "1769402558120582462407705162602495586224375718587025948012396599164446334364field",
                "tcm": "1287570132282816438755473932005084228140275627506917302828864079986149192975field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "multi_txn_t1.aleo",
                "function": "transfer_public",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "1575738950329383422422247684517095482384077815561522721304167065401340544730field"
                    },
                    {
                        "type": "public",
                        "id": "287806783914593275023521609130911486572705703542364712417568529120277386160field"
                    },
                    {
                        "type": "public",
                        "id": "1910399860355932884570161964105378606917540318022291506133610294644013707600field"
                    }
                ],
                "inputs": [
                    "aleo1rn636g94mx3qqhf7m79nsne3llv4dqs25707yhwcrk92p0kwrc9qe392wg",
                    "3u64",
                    "1u64"
                ],
                "signature": "sign1mv7aelslaa6cf8ukps2umjc0te9zsrdjj6ud44wpjgw5ww8x0uprxhvrvfqz0ftzj48tjf7pn3wnh7huv6uljv8fe2kv8hvc5ms0gqty2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6mm232e",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "1662306008282367117997468860850620259473158328342670494854493413432569699457field",
                "tcm": "7941671586650229911438366871688456215501704598379698200753944857782128879628field"
            }
        ],
        "transitions": [
            {
                "id": "au1knv5ddf5gfcmfn03w426008l32eqy09y67dunfy56fs5m9k35vqsq3lmnf",
                "program": "helper.aleo",
                "function": "mint_public",
                "inputs": [
                    {
                        "type": "public",
                        "id": "1884298325990663985098694436499169409831687479021778131930168571738259806343field",
                        "value": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                    },
                    {
                        "type": "public",
                        "id": "4483058636869781606780813789255111483938650756560504340964801378720475347302field",
                        "value": "4u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "record",
                        "id": "6764042663743289224337394431421184784059063048429771024582538676053871838079field",
                        "checksum": "2440565121608485969864418772759503376797590590176126327556306188158873083734field",
                        "value": "record1qyqspt2vz0gvlxevgl5236tj8py9weaeqg3s3rajctyjt2r7c7hrwksqqyrxzmt0w4h8ggcqqgqsq9rdgepj8wcwnwxkpaf6t4x550qut6pynaytfev3ua4msrak6ug0gsx0622cznf3a504g4yzfak2gs9yvnv5ec66wfcxywl0hphdkcpqew565s"
                    },
                    {
                        "type": "future",
                        "id": "942267263923864347111954287439400190753287822587890728179259170188424568323field",
                        "value": "{\n  program_id: helper.aleo,\n  function_name: mint_public,\n  arguments: [\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n    4u64\n  ]\n}"
                    }
                ],
                "tpk": "7290602541518738207975967503044122992114219099436097284354079663609278624429group",
                "tcm": "2206522099898335302100496120686031519100001456103818204430116646871569233630field"
            },
            {
                "id": "au1e62h84egadlucstpttdjc4nz06kwruwc2h4yn8apdg2lz2nx0yrsvhvjs4",
                "program": "helper.aleo",
                "function": "verify_balance",
                "inputs": [
                    {
                        "type": "public",
                        "id": "4533086632749708976596820511833312240667581088597429166606436539705000386843field",
                        "value": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                    }
                ],
                "outputs": [
                    {
                        "type": "future",
                        "id": "7783642354710184708056174042834474211385019346129698208744863368841037645467field",
                        "value": "{\n  program_id: helper.aleo,\n  function_name: verify_balance,\n  arguments: [\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z\n  ]\n}"
                    }
                ],
                "tpk": "621747410233580451453093428575820738620800804493774579524214658976312916012group",
                "tcm": "3695541206933324924125198290162224984990308027350393768742962971228222879340field"
            },
            {
                "id": "au16vfjs5d6g05mkwt2whnp8s6rlutjwx2jyxs20mjaahfkeggdpqfq46kqlf",
                "program": "helper.aleo",
                "function": "transfer_relayer",
                "inputs": [
                    {
                        "type": "public",
                        "id": "1467822955310890735332745644455943632121685868139037023499415056868662063712field",
                        "value": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                    },
                    {
                        "type": "public",
                        "id": "339154276910150706603006507495213926013747432229383971534733013368344136890field",
                        "value": "1u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "future",
                        "id": "8017510207441593852071634418627069702513292547639189756139798575515978208170field",
                        "value": "{\n  program_id: helper.aleo,\n  function_name: transfer_relayer,\n  arguments: [\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n    1u64\n  ]\n}"
                    }
                ],
                "tpk": "270095723687998941691830505951359390768433946757859098929113862094235689239group",
                "tcm": "80051728258119477824118467086136336417783625081986424163510437832566443487field"
            },
            {
                "id": "au1fu48asvrell37eu0szqc5np0jyaqa5xtmfs0x6hgnxf9xfhcrqqs7s9tfg",
                "program": "fees.aleo",
                "function": "fees",
                "inputs": [
                    {
                        "type": "public",
                        "id": "1283343599623892431850927547128781715235469395194148109241174602466664293953field",
                        "value": "1u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "future",
                        "id": "3791855985838707921237609339540004117665728167765894960942803085007656239209field",
                        "value": "{\n  program_id: fees.aleo,\n  function_name: fees,\n  arguments: [\n    aleo1y2ke48sqyas0u7vp4spspnxusdq7ns0xnvvrf4juuvrdskk64szswahj5r,\n    1u64\n  ]\n}"
                    }
                ],
                "tpk": "3082120049704871856812888765586379368304909340971207634553386698740339085498group",
                "tcm": "1287570132282816438755473932005084228140275627506917302828864079986149192975field"
            },
            {
                "id": "au16p9u9q864f6ewmpnrqjd83l5v2v776cnqchefs7f2axaaxk0cyxqrn0qmm",
                "program": "multi_txn_t1.aleo",
                "function": "transfer_public",
                "inputs": [
                    {
                        "type": "public",
                        "id": "1575738950329383422422247684517095482384077815561522721304167065401340544730field",
                        "value": "aleo1rn636g94mx3qqhf7m79nsne3llv4dqs25707yhwcrk92p0kwrc9qe392wg"
                    },
                    {
                        "type": "public",
                        "id": "287806783914593275023521609130911486572705703542364712417568529120277386160field",
                        "value": "3u64"
                    },
                    {
                        "type": "public",
                        "id": "1910399860355932884570161964105378606917540318022291506133610294644013707600field",
                        "value": "1u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "record",
                        "id": "5435635297410691418621534888705122009662251710090264959252873378642794898223field",
                        "checksum": "1449127860135237937064700560557810261734747585134591573919789603277947478803field",
                        "value": "record1qyqsq5l4jkse9rkyxm80m0u8w9xy9t29gv728gvk9elfe2e9zr9ggncvqyrxzmt0w4h8ggcqqgqsp9ph9slpmctvpqzzeend8j8jx6s3fw9smw2t9xv7x2x08d0egsgfmdttrfm89hwff7pryjr0qeygvrd4w76tu5utzt5r9h3f3fpaqvqsx6uvnq"
                    },
                    {
                        "type": "future",
                        "id": "5375909714863401529279615050914678481436379545004482679288203997941010409658field",
                        "value": "{\n  program_id: multi_txn_t1.aleo,\n  function_name: transfer_public,\n  arguments: [\n    {\n      program_id: helper.aleo,\n      function_name: mint_public,\n      arguments: [\n        aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n        4u64\n      ]\n    },\n    {\n      program_id: helper.aleo,\n      function_name: verify_balance,\n      arguments: [\n        aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z\n      ]\n    },\n    {\n      program_id: helper.aleo,\n      function_name: transfer_relayer,\n      arguments: [\n        aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n        aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n        1u64\n      ]\n    },\n    {\n      program_id: fees.aleo,\n      function_name: fees,\n      arguments: [\n        aleo1y2ke48sqyas0u7vp4spspnxusdq7ns0xnvvrf4juuvrdskk64szswahj5r,\n        1u64\n      ]\n    },\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z,\n    aleo1rn636g94mx3qqhf7m79nsne3llv4dqs25707yhwcrk92p0kwrc9qe392wg,\n    3u64\n  ]\n}"
                    }
                ],
                "tpk": "8031335449126626368446181800754086677978138075845678952155769447260469771825group",
                "tcm": "7941671586650229911438366871688456215501704598379698200753944857782128879628field"
            }
        ]
    }
}
```

#### For private authorization

##### Method: POST

```
http://localhost:3030/proveTx
```

##### Body (raw)

```
{
    "public": "0u64",
    "secret": {
        "requests": [
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "mint_private",
                "input_ids": [
                    {
                        "type": "private",
                        "id": "2119022232637469517769612248338146747626940866497985352395192790312706094600field"
                    },
                    {
                        "type": "private",
                        "id": "4880926126276258484665592398547215886446115564089911400932944041324777310813field"
                    }
                ],
                "inputs": [
                    "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                    "5u64"
                ],
                "signature": "sign1day3wzkz7ak2mqpfrk9j7aa7xg99fepm7wjntm8wqt0whp6rkypt32cqjeg2dl24pej94cs3q67pr47pr9cwvx8l0gy5s27sks2dwqty2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6w36y9f",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "5737405572331238816265796954514691577620628972228851493620850866643807180948field",
                "tcm": "1232725861640111515409587915013863143461230830102695540609496146135143898378field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "verify_balance",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "6331174351210455039038567628669183647380498611086023741152406457895134775277field"
                    }
                ],
                "inputs": [
                    "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                ],
                "signature": "sign18thz22uf30ffey22zlc9625lqa95nz5e2ymqhnu6mjjrpx0neypwfx6wafnenmypyj7maam2hkwdwq9tzt0aknhpd4jlt5jr9za4kqry2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6dpshk9",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "139069695717442364411157918708992098920714432693075886992812334768602376186field",
                "tcm": "619166013881537707299155495914654062255956138204475727657855439558826252354field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "helper.aleo",
                "function": "transfer_relayer_private",
                "input_ids": [
                    {
                        "type": "private",
                        "id": "2958096692154117626107666915647513789818336608911680275975415448303949208711field"
                    },
                    {
                        "type": "record",
                        "commitment": "5335346064932106289235860037336990934827544015627478527548416121107335388847field",
                        "gamma": "7964514869270162278026239608775105009251967765557830808856694054804297604974group",
                        "serial_number": "754284848336441949799074449531225175557548013204739038474416376781539818320field",
                        "tag": "1718609672787758795403718083327746749683937239879659005152187610737490688210field"
                    }
                ],
                "inputs": [
                    "1u64",
                    "{\n  owner: aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z.private,\n  amount: 5u64.private,\n  _nonce: 6369389907387330283333164611228209204080572155357718098600735198684806530582group.public\n}"
                ],
                "signature": "sign1rj7tz4z5em8yvspslvck7ddd05urr800p3dpefun5fusgw6pqvpfe0hx2fvn48jz76cd7hxtcvjsc83r4cge8z7h8uq3g6yxzs8xupry2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq6x06f5h",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "2096661658441052166764768053172912092887144401988116925183125851032449353822field",
                "tcm": "4722488883717030051174380715803112050527299919947286407435800322899378553657field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "fees.aleo",
                "function": "fees",
                "input_ids": [
                    {
                        "type": "public",
                        "id": "7522883969428764010755996984057627394529347480992729194468180399112220535344field"
                    }
                ],
                "inputs": [
                    "1u64"
                ],
                "signature": "sign1qkg6n5pfl02jprk5swc4pp3zu6l2879dflmlwr85f4gzp40y5cq4ycqfxqzh3uvryhqrnmfwwvlf7e8jtu5f8s4g5cp89t5rdf8v7qny2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq62km7es",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "3210770313524943329861664622910496748058275696424058644314954216812186031168field",
                "tcm": "478993136303904733120572119050713946527134441825480037135346130990269773743field"
            },
            {
                "signer": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z",
                "network": "3u16",
                "program": "multi_txn_t1.aleo",
                "function": "transfer_private",
                "input_ids": [
                    {
                        "type": "private",
                        "id": "1466274837066332294463021248440642967279101054942487982764442375255523045699field"
                    },
                    {
                        "type": "private",
                        "id": "5404161138127331419732996945202414982286371156569849630471024524076509398724field"
                    },
                    {
                        "type": "public",
                        "id": "4702055359438902755311415659532134304690638130410856769780317718553162923845field"
                    }
                ],
                "inputs": [
                    "aleo1rn636g94mx3qqhf7m79nsne3llv4dqs25707yhwcrk92p0kwrc9qe392wg",
                    "3u64",
                    "2u64"
                ],
                "signature": "sign1zzcpgsm4cny9zxuzc8ltslu3t95fypu6hmgn8nr0qq7lalx0pqpr0meupnm0hu443ag95t6a57vw24dyd32576sex85qljfv98pqcqty2qu0tlnxr7ela83s343w068heyc2cn2wl9x25v8w4k2sw3epqrcu849m2fpwl3h3ha7937jn03jggereel46r70frhttx8a055gq67ftyd5",
                "sk_tag": "7864463876068565184851806140958199371028060526101288629538544050754304575293field",
                "tvk": "2649894414026030654342952585295673218980225387948831370784196015285437795983field",
                "tcm": "4184102195091691820816690149046866705880779840572425682225820515050621308820field"
            }
        ],
        "transitions": [
            {
                "id": "au1rzek55vtu2sv53ezfsp6gm5n7gndfjpupwy0r42tp7eq0ksmhcrsufus4t",
                "program": "helper.aleo",
                "function": "mint_private",
                "inputs": [
                    {
                        "type": "private",
                        "id": "2119022232637469517769612248338146747626940866497985352395192790312706094600field",
                        "value": "ciphertext1qgqrwgwjhr3hx9pfnauyk7zv23ks6yza64wakm4qlhrrqctcvnx7qy99wlk4vpn9pnxlnqsxe9525stapd9cggd9lq2ws9jtva7w76vyzgekxcch"
                    },
                    {
                        "type": "private",
                        "id": "4880926126276258484665592398547215886446115564089911400932944041324777310813field",
                        "value": "ciphertext1qyqx20cjeljt5ffr652luycx5pg904vcj0rmjdkwc8jr72w5ffxxuygynnng3"
                    }
                ],
                "outputs": [
                    {
                        "type": "record",
                        "id": "5335346064932106289235860037336990934827544015627478527548416121107335388847field",
                        "checksum": "556808889612608976846957787573135377965401971046945878757358788724137000954field",
                        "value": "record1qyqspxrcxzjf2kp47egu8kke0z5t222ngessjtmgkmygal96pl8z7tc9qyrxzmt0w4h8ggcqqgqsq5tczu25e05p06d9kxnm8nsmtuws2vjz7hy4gqt5fqyhx9vlqwswzerd5c95q0xjf4jqltsrtxk4su0pudjwxrdxs7hpflqng6hjzs8qyhqz4q"
                    }
                ],
                "tpk": "6054198799514115770296949837167811627821559440293540481263309762527381781399group",
                "tcm": "1232725861640111515409587915013863143461230830102695540609496146135143898378field"
            },
            {
                "id": "au1t7wdvg7qssgs5f9sm82sgkydy7uw6l93lgr9sd93y4fnhrypvsrqzfv8ze",
                "program": "helper.aleo",
                "function": "verify_balance",
                "inputs": [
                    {
                        "type": "public",
                        "id": "6331174351210455039038567628669183647380498611086023741152406457895134775277field",
                        "value": "aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z"
                    }
                ],
                "outputs": [
                    {
                        "type": "future",
                        "id": "1566875161342285462137705070931295925683351168652789564040704977289017589626field",
                        "value": "{\n  program_id: helper.aleo,\n  function_name: verify_balance,\n  arguments: [\n    aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z\n  ]\n}"
                    }
                ],
                "tpk": "4056968789007407609694460226483745467145815102218868908387448471210504851845group",
                "tcm": "619166013881537707299155495914654062255956138204475727657855439558826252354field"
            },
            {
                "id": "au12ygm2f8qeqd0xnjzm2a7kgvtx4z88sm7jvqyg8twmpa97j0zuqzsplc7mw",
                "program": "helper.aleo",
                "function": "transfer_relayer_private",
                "inputs": [
                    {
                        "type": "private",
                        "id": "2958096692154117626107666915647513789818336608911680275975415448303949208711field",
                        "value": "ciphertext1qyqw8ewftprs692a32ftkf00yfsyhjzew8psf6a0tpmah7rtlqxfxzsgn3han"
                    },
                    {
                        "type": "record",
                        "id": "754284848336441949799074449531225175557548013204739038474416376781539818320field",
                        "tag": "1718609672787758795403718083327746749683937239879659005152187610737490688210field"
                    }
                ],
                "outputs": [
                    {
                        "type": "record",
                        "id": "6029927754202837890269223875279246503886568107240541753810624530931073247325field",
                        "checksum": "7853402538772391831161045751869164101041884502068458061845207973234618652679field",
                        "value": "record1qyqsp0apate08r0le7xnypsd886p6y2jdwnrdzsrdc590zumllmv85syqyrxzmt0w4h8ggcqqgqsqacg2pvq0l4fpxeh0emc5kjt7ey4kp7dx6cyhsk7t97xxlkfj3qfcphvt2ksj79fq8e8hwxcl9x7n7xh5etspcjlzzjh0qu3p4s7rgxs60trvs"
                    },
                    {
                        "type": "record",
                        "id": "5245699967874660246131795063524038561728918391598974305971468848452772658365field",
                        "checksum": "1869329987179765294357094836395673054369192962919216352507756279385378838998field",
                        "value": "record1qyqspcvs4n3294wjxy7g3klsu5rl29j3tq95dfv697zpwwnmz9al0kgzqyrxzmt0w4h8ggcqqgqspdrv2pr2mul0q9yn0pf40npunzmdac44auqy6pu7trk48gn9xqq9wu6csh5x3275nr7xsjdwej3wa2tgshlsv5ukjw779gw4u2vkdgzspustvt"
                    }
                ],
                "tpk": "7667474773412625555170591547984022368634886409251768858598791746111632591976group",
                "tcm": "4722488883717030051174380715803112050527299919947286407435800322899378553657field"
            },
            {
                "id": "au1mchy3mltwrpvarf992ynyjaylqwf2zx44he6xeyhcxqw2wcxcggsk2xzu3",
                "program": "fees.aleo",
                "function": "fees",
                "inputs": [
                    {
                        "type": "public",
                        "id": "7522883969428764010755996984057627394529347480992729194468180399112220535344field",
                        "value": "1u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "future",
                        "id": "6727984849281114709575622621628247171834412683580058728910461049814662358137field",
                        "value": "{\n  program_id: fees.aleo,\n  function_name: fees,\n  arguments: [\n    aleo1y2ke48sqyas0u7vp4spspnxusdq7ns0xnvvrf4juuvrdskk64szswahj5r,\n    1u64\n  ]\n}"
                    }
                ],
                "tpk": "3728877933311344319406899438797759591876952139137018280177989840869567654334group",
                "tcm": "478993136303904733120572119050713946527134441825480037135346130990269773743field"
            },
            {
                "id": "au1wfytlpddkf8c935v2rdzjqsd80ulgdkcl623pfwe2e2xftay0ggsnegyxh",
                "program": "multi_txn_t1.aleo",
                "function": "transfer_private",
                "inputs": [
                    {
                        "type": "private",
                        "id": "1466274837066332294463021248440642967279101054942487982764442375255523045699field",
                        "value": "ciphertext1qgqt94g5tclepdfrnnm758nv96nea2h7gt2kyzsjev23j6cwdf50gzsp29addr68wlwd7yd8eaz5m3hunwtlq3jtc68xe8d5akcear3vzgn4fc7z"
                    },
                    {
                        "type": "private",
                        "id": "5404161138127331419732996945202414982286371156569849630471024524076509398724field",
                        "value": "ciphertext1qyqd2lwx4xeun8da5wt9yml7pxg8hvtphffjlxccrkd7eep3gnac6ygw2ctyg"
                    },
                    {
                        "type": "public",
                        "id": "4702055359438902755311415659532134304690638130410856769780317718553162923845field",
                        "value": "2u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "record",
                        "id": "4766215325324729944262816911923802134306113366483082736466670957732505766115field",
                        "checksum": "3263071123105519685923111125637439330752402308997520717538098743640202651650field",
                        "value": "record1qyqspzstak4mqkhpmjnfwa8x9cetl8wetyvawu9kuuuchsje2m6w88gqqyrxzmt0w4h8ggcqqgqsqmclumq5hvzlycsl5xv8tah4judvr439pcpzu2huvsm6ta8wlsgtkferat5y4jtps3q9z2r02x5u2ewepx4qvydxwm4uyzdvhvlzxv8srwek6p"
                    },
                    {
                        "type": "record",
                        "id": "7133371181030102755701203181534845287488729764971733969582529573027050285614field",
                        "checksum": "3370765274362748458476621033502706267207549879483024250265308325339900278612field",
                        "value": "record1qyqsph6p3zam6zpuhg4nur3zj4gm5jqt6880z0pc93qm4tuq2lukysgwqyrxzmt0w4h8ggcqqgqsq3yy0wrl3hc52lg93nzjg2gw5s7ve4f4np8mz3x2e5ddtg5x6qg9a447z9rd794f8wxjj4wq57yqju92uthv8qmf45ez4k8vas2kpgrs2x0hee"
                    },
                    {
                        "type": "future",
                        "id": "8195709144445687573599233441589157814673966964400126465279115830264197301697field",
                        "value": "{\n  program_id: multi_txn_t1.aleo,\n  function_name: transfer_private,\n  arguments: [\n    {\n      program_id: helper.aleo,\n      function_name: verify_balance,\n      arguments: [\n        aleo1va0hzrcsj569gz0gd0mvue7xk54vku626nsmvl86s7j490x7yupq89l82z\n      ]\n    },\n    {\n      program_id: fees.aleo,\n      function_name: fees,\n      arguments: [\n        aleo1y2ke48sqyas0u7vp4spspnxusdq7ns0xnvvrf4juuvrdskk64szswahj5r,\n        1u64\n      ]\n    }\n  \n  ]\n}"
                    }
                ],
                "tpk": "1996834967290224516278861808508543192098955880988727674199793285415627963129group",
                "tcm": "4184102195091691820816690149046866705880779840572425682225820515050621308820field"
            }
        ]
    }
}
```