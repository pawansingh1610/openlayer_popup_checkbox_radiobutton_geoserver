(function() {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'GoogleMap',
                        type: 'base',
                        visible: false,
                        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' })
                    }),
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    }),
                    new ol.layer.Group({
                        title: 'Satellite and labels',
                        type: 'base',
                        combine: true,
                        visible: false,
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.BingMaps({
                                    // Get your own key at https://www.bingmapsportal.com/
                                    key: 'Ahd_32h3fT3C7xFHrqhpKzoixGJGHvOlcvXWy6k2RRYARRsrfu7KDctzDT2ei9xB',
                                    imagerySet: 'Aerial'
                                })
                            }),
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'terrain-labels'
                                })
                            })
                        ]
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Tile({
                        title: 'Entry_Points',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Entry_Points'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Sector',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Sector'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'River',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Ganga_River'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Roads',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Roads'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Island',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Island'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Police_and_fire_station',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Police_and_fire_station'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Public_accomodation',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Public_accomodation'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Cultural_Pandaal',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Cultural_Pandaal'},
                            serverType: 'geoserver'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Entry_Points',
                        source: new ol.source.TileWMS({
                            url: 'http://localhost:8080/geoserver/wms',
                            params: {'LAYERS': 'Pawan:Entry_Points'},
                            serverType: 'geoserver'
                        })
                    })
                ]
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([81.85, 25.45], 'EPSG:4326', 'EPSG:3857'),
            zoom:12,
            maxZoom:18,
            minZoom:6
        })
    });

    // LayerSwitcher

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);

    // Popup

    var popup = new ol.Overlay.Popup();
    map.addOverlay(popup);

    map.on('singleclick', function(evt) {
        var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
        popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
    });

})();