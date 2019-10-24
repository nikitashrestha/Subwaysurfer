class Helper{
    project(point, cameraX, cameraY, cameraZ, cameraD, width, height, roadWidth){
        point.camera.x = (point.world.x || 0) - cameraX;
        point.camera.y = (point.world.y || 0) - cameraY;
        point.camera.z = (point.world.z || 0) - cameraZ;
        point.screen.scale = cameraD/point.camera.z;
        point.screen.x = Math.round((width / 2) + (point.screen.scale * point.camera.x * width / 2));
        point.screen.y = Math.round((height / 2) - (point.screen.scale * point.camera.y * height / 2));
        point.screen.w = Math.round((point.screen.scale * roadWidth * width / 2));
    }

    overlap(x1, w1, x2, w2, percent) {
        let half = (percent || 1) / 2;
        let min1 = x1 - (w1 * half);
        let max1 = x1 + (w1 * half);
        let min2 = x2 - (w2 * half);
        let max2 = x2 + (w2 * half);
        return !((max1 < min2) || (min1 > max2));
    }

    rumbleWidth(projectedRoadWidth, lanes) {
        return projectedRoadWidth / Math.max(6, 2 * lanes);
    }

    laneMarkerWidth(projectedRoadWidth, lanes) {
        return projectedRoadWidth / Math.max(32, 8 * lanes);
    }

    percentRemaining(n, total){
        return (n%total)/total;
    }
    
    toInt(obj, def) {
        if (obj !== null) {
            let x = parseInt(obj, 10);
            if (!isNaN(x))
                return x;
    }
    return this.toInt(def, 0);
    }

    limit(value, min, max){
        return Math.max(min, Math.min(value, max));
    } 

    interpolate(a,b,percent){
        return a + (b-a)*percent
    }

    easeIn(a,b,percent){ return a + (b-a)*Math.pow(percent,2);}

    easeOut(a,b,percent){ return a + (b-a)*(1-Math.pow(1-percent,2));}
    
    easeInOut(a,b,percent){ return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);}
}