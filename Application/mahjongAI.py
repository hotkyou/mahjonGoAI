import pickle

class mahjongAI:
    def __init__(self):
        USEMODEL = 'Application/model/MLP100.pickle'
        with open(USEMODEL, mode='rb') as fp:
            self.pload = pickle.load(fp)
        
    def startPredict(self, data):
        gopickle = [0 for i in range(34)]
        all = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 'z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7']
        for selfindex in data:
            count = 0
            for allindex in all:
                if selfindex == allindex:
                    gopickle[count] += 1
                    break
                count += 1
        print(data)
        print(gopickle)
        ans = self.pload.predict([gopickle])
        print(ans[0])
        return ans[0]
    
    def autoPredict(self, data):
        return self.startPredict(data)