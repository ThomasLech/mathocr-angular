app
    .directive('mathjax', function() {
        var refresh = function(element) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
        };
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.mathjax, function(newValue, oldValue) {
                    element.text('$$'+newValue+'$$');
                    refresh(element[0]);
                });
            }
        };
    });
