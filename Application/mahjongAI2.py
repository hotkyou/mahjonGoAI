import asyncio
import json
import pickle
import lightgbm
import numpy as np

class mahjongAI2:
    def __init__(self):
        self.data = []
        
        self.all = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8',
                    'p9', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 'z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7']
        self.dorall = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6',
                    'p7', 'p8', 'p9', 'p0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's0', 'z1', 'z2', 'z3',
                    'z4', 'z5', 'z6', 'z7']
        
        self.rtehai = [0] * 37
        self.rreach = []
        self.rdora = [0] * 34
        self.rbakaze = []
        self.rmykaze = []
        self.rchangbang = []
        self.rlizhibang = []
        self.rnaki = [[0] * 37 for _ in range(4)]
        self.rdiscard = [[0] * 37 for _ in range(4)]
        self.rscore = []
        self.rtiles = []

    def update_counts(self, items, counts):
        for item in items:
            if item in self.dorall:
                counts[self.dorall.index(item)] += 1
                
    def update_doracounts(self, items, counts):
        for item in items:
            if item in self.all:
                counts[self.all.index(item)] += 1

    def process_wind(self, wind):
        #print(wind)
        wind_mapping = {"東": 0, "南": 1, "西": 2, "北": 3}
        if wind[0] not in wind_mapping:
            print(wind[0])
            raise ValueError("風が不正です")
        return wind_mapping[wind[0]]

    def process_naki(self, naki_group):
        for i, naki_type in enumerate(["me", "right", "straight", "left"]):
            for tile in naki_group[naki_type]:
                if tile != "_":
                    self.rnaki[i][self.dorall.index(tile)] += 1
            self.rnaki[i] = [4 if x == 2 else x for x in self.rnaki[i]]

    def jsonCreate(self, data):
        tehai = data.get('dataPai') # 手牌
        reach = data.get('reach')   # リーチ
        dora = data.get('dora')     # ドラ
        bakaze = data.get('kaze')   # 場風
        mykaze = data.get('mykaze') # 自風
        changbang = data.get('changbang') # 何本場
        lizhibang = data.get('lizhibang') # 立直棒繰越
        naki = data.get('naki')     # 鳴き
        discard = data.get('discard') # 捨て牌
        score = data.get('score')   # 点数
        tiles = data.get('tiles')   # 残り牌
        
        self.update_counts(tehai, self.rtehai)
        self.rreach = reach
        self.update_doracounts(dora, self.rdora)
        self.rbakaze = self.process_wind(bakaze)
        self.rmykaze = self.process_wind(mykaze)
        self.rchangbang = int(changbang)
        self.rlizhibang = int(lizhibang)
        self.process_naki(naki[0])
        for i in discard[0]["me"]:
            self.rdiscard[0][self.dorall.index(i)] += 1
        for i in discard[0]["right"]:
            self.rdiscard[1][self.dorall.index(i)] += 1
        for i in discard[0]["straight"]:
            self.rdiscard[2][self.dorall.index(i)] += 1
        for i in discard[0]["left"]:
            self.rdiscard[3][self.dorall.index(i)] += 1
        self.rscore = score
        self.rtiles = int(tiles)
        
        self.data.extend(self.rtehai)
        self.data.extend(self.rreach)
        self.data.extend(self.rdora)
        self.data.append(self.rbakaze)
        self.data.append(self.rmykaze)
        self.data.append(self.rchangbang)
        self.data.append(self.rlizhibang)
        self.data.extend(self.rnaki[0])
        self.data.extend(self.rnaki[1])
        self.data.extend(self.rnaki[2])
        self.data.extend(self.rnaki[3])
        self.data.extend(self.rdiscard[0])
        self.data.extend(self.rdiscard[1])
        self.data.extend(self.rdiscard[2])
        self.data.extend(self.rdiscard[3])
        self.data.extend(self.rscore)
        self.data.append(self.rtiles)
        return self.data
    
class mahjongPredict:
    def __init__(self):
        self.data = []
        # self.mahjong = ["一萬", "二萬", "三萬", "四萬", "五萬", "六萬", "七萬", "八萬", "九萬", "赤五萬",
        #                 "一筒", "二筒", "三筒", "四筒", "五筒", "六筒", "七筒", "八筒", "九筒", "赤五筒",
        #                 "一索", "二索", "三索", "四索", "五索", "六索", "七索", "八索", "九索", "赤五索",
        #                 "東", "南", "西", "北", "白", "發", "中"]
        self.mahjong = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m0",
                        "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p0",
                        "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s0",
                        "z1", "z2", "z3", "z4", "z5", "z6", "z7"]
    
    async def autoPredict(self, data):
        result = await predictions(data)
        #print(result[0])
        probabilities = np.array(result)
        #print(probabilities)
        percentages = probabilities * 100
        
        #打牌用
        for i, percent in enumerate(percentages[0]):
            self.data.append({"name": self.mahjong[i], "population": float(f"{percent:.1f}")})
        
        return self.data

async def load_model(file_path):
    with open(file_path, 'rb') as model_file:
        return pickle.load(model_file)

async def load_models():
    model_paths = [
        'Application/model/lightgbm2012_p1.pkl',
        'Application/model/lightgbm2012_p2.pkl',
        'Application/model/lightgbm2013_p1.pkl',
        'Application/model/lightgbm2013_p2.pkl',
        'Application/model/lightgbm2014_p1.pkl',
        'Application/model/lightgbm2014_p2.pkl',
        'Application/model/lightgbm2015_p1.pkl',
        'Application/model/lightgbm2015_p2.pkl',
        'Application/model/lightgbm2016_p1.pkl',
        'Application/model/lightgbm2016_p2.pkl',
        'Application/model/lightgbm2017_p1.pkl',
        'Application/model/lightgbm2017_p2.pkl',
        'Application/model/lightgbm2018_p1.pkl',
        'Application/model/lightgbm2018_p2.pkl',
        'Application/model/lightgbm2019_p1.pkl',
        'Application/model/lightgbm2019_p2.pkl',
    ]
    return await asyncio.gather(*[load_model(path) for path in model_paths])

async def predictions(data):
    alldata = []
    models = await load_models()
    for i, model in enumerate(models, start=1):
        predictions = model.predict(data)
        alldata.append(predictions)
    mean_predictions = np.mean(alldata, axis=0)
    normalized_predictions = mean_predictions / np.sum(mean_predictions)
    output_sum = np.sum(normalized_predictions)
    #print(output_sum)
    return normalized_predictions

# Example usage
async def main(data):
    predictor = mahjongPredict()
    result = await predictor.autoPredict(data)
    #print(result)
    return result

class mahjongKanPredict:
    def predict(self, data):
        with open('Application/model/kan.pkl', 'rb') as model_file:
            self.kanmodel = pickle.load(model_file)
        return self.kanmodel.predict(data)
        

def kan(data):
    mahjong = mahjongKanPredict()
    result = mahjong.predict(data)
    #print(result)
    return result[0]

class mahjongPonPredict:
    def predict(self, data):
        with open('Application/model/pon.pkl', 'rb') as model_file:
            self.ponmodel = pickle.load(model_file)
        return self.ponmodel.predict(data)

def pon(data):
    mahjong = mahjongPonPredict()
    result = mahjong.predict(data)
    #print(result)
    return result[0]

class mahjongReachPredict:
    def predict(self, data):
        with open('Application/model/reach.pkl', 'rb') as model_file:
            self.reachmodel = pickle.load(model_file)
        return self.reachmodel.predict(data)

def reach(data):
    mahjong = mahjongReachPredict()
    result = mahjong.predict(data)
    #print(result)
    return result

class mahjongChiPredict:
    def predict(self, data):
        with open('Application/model/chii.pkl', 'rb') as model_file:
            self.chimodel = pickle.load(model_file)
        return self.chimodel.predict(data)
    
def chi(data):
    mahjong = mahjongChiPredict()
    result = mahjong.predict(data)
    #print(result)
    return result[0]