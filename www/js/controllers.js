app
    .controller('cameraPreviewCtrl', ['$scope', '$state', '$document', '$http', 'pictureService', function($scope, $state, $document, $http, pictureService) {

        $scope.flash_mode = CameraPreview.FLASH_MODE.OFF;

        // Absolute paths to icons
        $scope.flash_on_icon = 'img/flash_on.svg';
        $scope.flash_off_icon = 'img/flash_off.svg';
        $scope.take_pic_icon = 'img/btn_icon5.png';

        // Rectangle element reference
        var rect = document.getElementsByClassName('rectangle')[0];

        $scope.takePicture = function() {

            // Get rectangle size
            var rect_width = rect.offsetWidth, rect_height = rect.offsetHeight;

            // Get rectangle coordinates
            var rect_coords = rect.getBoundingClientRect();
            var x_coord = rect_coords.left, y_coord = rect_coords.top;

            CameraPreview.takePicture(function(base64_img) {

                pictureService.crop(base64_img, rect_width, rect_height, x_coord, y_coord).then(

                    function successCallback(cropped_base64_img) {

                        pictureService.send(cropped_base64_img).then(

                            function successCallback(response) {

                                var results = response.data;
                                // Do sth with results
                                $state.go('resultsPanel', {'results': results});
                            },
                            function errorCallback(error) {
                                alert('status:' + error.status + '\nstatusText:' + error.statusText);
                            }
                        );
                    },
                    function errorCallback(error) {
                        alert(error);
                    }
                );
            });
        };

        $scope.changeFlashMode = function() {

            // Trigger flash mode
            if ($scope.flash_mode === CameraPreview.FLASH_MODE.OFF) {
                $scope.flash_mode = CameraPreview.FLASH_MODE.ON;
            } else {
                $scope.flash_mode = CameraPreview.FLASH_MODE.OFF;
            }
            // Set flash mode
            CameraPreview.setFlashMode($scope.flash_mode);
        };
    }])
    .controller('resultsPanelCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

        // Retrieve prediction that was passed from cameraPreview state
        $scope.results = $stateParams.results;
    }])
