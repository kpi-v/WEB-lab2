function updateArrow() {
            let startEl = document.getElementById("start");
            let endEl = document.getElementById("end");
            let arrowPath = document.getElementById("arrowPath");
            let arrowHead = document.getElementById("arrowHead");

            let startRect = startEl.getBoundingClientRect();
            let endRect = endEl.getBoundingClientRect();

            // Get absolute positions (viewport-relative)
            let startX = startRect.left/1.01; // Right edge of <p>
            let startY = startRect.top + startRect.height / 2;
            let endX = endRect.left + endRect.width/2; // Left edge of <a>
            let endY = endRect.top + endRect.height;

            // Define curvature control points
            let midX1 = (startX + endX) - window.innerWidth;
            let midY1 = startY + 10; // Curve upward
            let midX2 = (startX + endX) / 2;
            let midY2 = endY*4; // Curve downward

            // SVG path for Bezier curve
            let d = `M ${startX},${startY} 
                     C ${midX1},${midY1} ${midX2},${midY2} ${endX},${endY}`;

            arrowPath.setAttribute("d", d);

            // Arrowhead calculation
            let arrowSize = 20;
            let angle = Math.atan2(endY - midY2, endX - midX2);
            let arrowHeadPoints = `
                ${endX},${endY}
                ${endX - arrowSize * Math.cos(angle - Math.PI / 6)},${endY - arrowSize * Math.sin(angle - Math.PI / 6)}
                ${endX - arrowSize * Math.cos(angle + Math.PI / 6)},${endY - arrowSize * Math.sin(angle + Math.PI / 6)}
            `;

            arrowHead.setAttribute("points", arrowHeadPoints);
        }

        // Run function on load and resize
        window.onload = updateArrow;
        window.onresize = updateArrow;
        window.onscroll = updateArrow;
