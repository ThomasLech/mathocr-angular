app
    .service('pictureService', ['$http', '$q', function($http, $q) {

        this.picture_endpoint = 'http://192.168.43.38:8000/api/images/create/';

        this.crop = function(base64_img, rect_width, rect_height, x_coord, y_coord) {
            var deferred = $q.defer();

            // image variable will contain ORIGINAL image
            var image = new Image();

            // canvas variable will contain CROPPED image
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // Load original image onto image object
            image.src = 'data:image/png;base64,' + base64_img;
            image.onload = function(){

                // Map rectangle onto image taken
                var x_axis_scale = image.width / window.screen.width
                var y_axis_scale = image.height / window.screen.height
                // INTERPOLATE
                var x_coord_int = x_coord * x_axis_scale;
                var y_coord_int = y_coord * y_axis_scale;
                var rect_width_int = rect_width * x_axis_scale;
                var rect_height_int = rect_height * y_axis_scale

                // Set canvas size equivalent to cropped image size
                canvas.width = rect_width_int;
                canvas.height = rect_height_int;

                ctx.drawImage(image,
                    x_coord_int, y_coord_int,           // Start CROPPING from x_coord(interpolated) and y_coord(interpolated)
                    rect_width_int, rect_height_int,    // Crop interpolated rectangle
                    0, 0,                               // Place the result at 0, 0 in the canvas,
                    rect_width_int, rect_height_int);   // Crop interpolated rectangle

                // Get base64 representation of cropped image
                var cropped_img_base64 = canvas.toDataURL();

                // Cropping has been finished
                deferred.resolve(cropped_img_base64);
            };

            return deferred.promise;
        };

        this.send = function(cropped_img_base64) {
            // Ending slash is necessary
            return $http.post(this.picture_endpoint,
                {
                    // Data sent along with a request
                    image: cropped_img_base64
                }
            );
        }
    }])
    .service('plotService', ['$q', function($q) {
        this.generate_plot2D = function(formula, ax_start, ax_range, step=0.1) {
            var deferred = $q.defer();
            // // Specify plot's destination element
            // var dest = document.getElementById('plot');
            // var data = [
            //     {x: 0, y: 0},
            //     {x: 1, y: 1},
            //     {x: 2, y: 2},
            //     {x: 3, y: 3},
            //     {x: 4, y: 4},
            //     {x: 5, y: 5},
            // ];
            //
            // var options = {
            //     drawPoints: false,
            //     defaultGroup: 'ungrouped',
            //     legend: false,
            //     moveable: false,
            //     showCurrentTime: false,
            // };
            //
            // var dataset = new vis.DataSet(data);
            // var graph2d = new vis.Graph2d(dest, dataset, options);
            // functionPlot({
            //     title: formula,
            //     target: '#plot',
            //     data: [{
            //         fn: 'x^2',
            //     }],
            //     width: window.innerWidth,
            //     disableZoom: true,
            // })
            // deferred.resolve();

            // Fill axes with scalars
            var x_axis = [];
            var y_axis = [];
            for (var i = ax_start; i < ax_start + ax_range; i+=step) {
                var x = i;
                x_axis.push(x);
                y_axis.push(eval(formula));
            }

            // Specify plot properties
            var graph = [{
                x: x_axis,
                y: y_axis,
                mode: 'lines',
                name: formula,
                line: {
                    color: 'rgb(55, 128, 191)',
                    width: 1
                }
            }];
            var layout = {
                title: formula,
            };
            // Compile created graph
            var plot_data = {
                'graph': graph,
                'layout': layout,
            };
            // Build the graph has been finished
            deferred.resolve(plot_data);

            return deferred.promise;
        };

        this.generate_plot3D = function(formula, ax_start, ax_range, step=0.1) {
            var deferred = $q.defer();

            // Fill axes with scalars
            var x_axis = [];
            var y_axis = [];
            var z_axis = [];
            for (var x = ax_start; x < ax_start + ax_range; x+=step) {
                x_axis.push(x);
                for(var y = ax_start; y < ax_start + ax_range; y+=step) {
                    // Calculate y axis values for corresponding x
                    y_axis.push(eval(formula));
                }
                z_axis.push(y_axis);
                y_axis = [];
            }

            // Specify plot properties
            var graph = [{
                z: z_axis,
                type: 'surface',
            }];
            var layout = {
                title: formula,
                margin: {
                    l: 60,
                    r: 60,
                    b: 60,
                    t: 60,
                },
            };
            // Compile created graph
            var plot_data = {
                'graph': graph,
                'layout': layout,
            };
            // Build the graph has been finished
            deferred.resolve(plot_data);

            return deferred.promise;
        };
    }])
