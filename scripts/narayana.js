(function () {
    var naraApp = angular.module("naraApp", ['ngResource', 'ngCookies'])

    naraApp.filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
    naraApp.service('resourceService', function () {
        var self = this;
        self.slokaResourceUrl = "http://narayaneeyam-firststep.org/dashaka"
        self.slokaAudioBaseUrl = "https://slokastorage.blob.core.windows.net/narayanaresources/Dasakam-";
        self.dasakams = ['Dhyanam', 'Dasakam 1', 'Dasakam 2', 'Dasakam 3', 'Dasakam 4', 'Dasakam 5', 'Dasakam 6',
            'Dasakam 7', 'Dasakam 8', 'Dasakam 9', 'Dasakam 10', 'Dasakam 11', 'Dasakam 12', 'Dasakam 13', 'Dasakam 14',
            'Dasakam 15', 'Dasakam 16', 'Dasakam 17', 'Dasakam 18', 'Dasakam 19', 'Dasakam 20', 'Dasakam 21', 'Dasakam 22',
            'Dasakam 23', 'Dasakam 24', 'Dasakam 25', 'Dasakam 26', 'Dasakam 27', 'Dasakam 28', 'Dasakam 29', 'Dasakam 30',
            'Dasakam 31', 'Dasakam 32', 'Dasakam 33', 'Dasakam 34', 'Dasakam 35', 'Dasakam 36', 'Dasakam 37', 'Dasakam 38',
            'Dasakam 39', 'Dasakam 40', 'Dasakam 41', 'Dasakam 42', 'Dasakam 43', 'Dasakam 44', 'Dasakam 45', 'Dasakam 46',
            'Dasakam 47', 'Dasakam 48', 'Dasakam 49', 'Dasakam 50', 'Dasakam 51', 'Dasakam 52', 'Dasakam 53', 'Dasakam 54',
            'Dasakam 55', 'Dasakam 56', 'Dasakam 57', 'Dasakam 58', 'Dasakam 59', 'Dasakam 60', 'Dasakam 61', 'Dasakam 62',
            'Dasakam 63', 'Dasakam 64', 'Dasakam 65', 'Dasakam 66', 'Dasakam 67', 'Dasakam 68', 'Dasakam 69', 'Dasakam 70',
            'Dasakam 71', 'Dasakam 72', 'Dasakam 73', 'Dasakam 74', 'Dasakam 75', 'Dasakam 76', 'Dasakam 77', 'Dasakam 78',
            'Dasakam 79', 'Dasakam 80', 'Dasakam 81', 'Dasakam 82', 'Dasakam 83', 'Dasakam 84', 'Dasakam 85', 'Dasakam 86',
            'Dasakam 87', 'Dasakam 88', 'Dasakam 89', 'Dasakam 90', 'Dasakam 91', 'Dasakam 92', 'Dasakam 93', 'Dasakam 94',
            'Dasakam 95', 'Dasakam 96', 'Dasakam 97', 'Dasakam 98', 'Dasakam 99', 'Dasakam 100'];

        self.dasakam = 0;

        self.getFormattedNumber = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num;
        };

        return {

            getSlokaResourceUrl: function (index) {
                return self.slokaResourceUrl + index;
            },

            getAudioURL: function (index) {
                return self.slokaAudioBaseUrl + self.getFormattedNumber(index) + ".mp3";
            },

            getDasakams: function () {
                return self.dasakams;
            },

            getDasakamName: function (index) {
                return self.dasakams[index];
            },

            setSloka: function (index) {
                self.dasakam = index;
            }
        }
    });
    naraApp.controller('naraController', ['$scope', '$http', '$cookies', 'resourceService', function ($scope, $http, $cookies, resourceService) {
        var self = this;

        self.getDasakams = function () {
            return resourceService.getDasakams();
        };

        self.getDasakamName = function (index) {
            return resourceService.getDasakamName(index);
        };

        self.getSlokaResourceUrl = function (index) {
            return resourceService.getSlokaResourceUrl(index);
        };

        self.getSlokaAudioURL = function (index) {
            return resourceService.getAudioURL(index);
        };

        self.setSloka = function (index) {
            return resourceService.setSloka(index);
        };

        self.getControl = function (index) {
            return $("#" + index)[0];
        }

        self.playSloka = function (index, url) {
            self.stopOtherAudio(index);
            audio = self.getControl("audio" + index);
            audio.src = url;
            audio.play();
            self.disablePlay(index);
        }

        self.disablePlay = function (index) {
            btnPlay = self.getControl("btnPlay" + index);
            btnPlay.disabled = true;
            btnStop = self.getControl("btnStop" + index);
            btnStop.disabled = false;
        }

        self.stopOtherAudio = function () {
            $("audio").each(function (index) {
                audio = self.getControl("audio" + index);
                audio.pause();
                audio.currentTime = 0;
                self.enablePlay(index);
            });
        }

        self.enablePlay = function (index) {
            btnPlay = self.getControl("btnPlay" + index);
            btnPlay.disabled = false;
            btnStop = self.getControl("btnStop" + index);
            btnStop.disabled = true;
        }

        self.stopSloka = function (index) {
            audio = self.getControl("audio" + index);
            audio.src = "";
            self.enablePlay(index);
        }
    }]);
})();
