class Awake(object):
    def __init__(self):
        self._is_awake = False

    @property
    def is_awake(self):
        return self._is_awake

    @is_awake.setter
    def is_awake(self, value):
        print("setter of x called")
        self._is_awake = value

