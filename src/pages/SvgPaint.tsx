import { useState, useRef } from "react";
import { Box, Button } from "@mantine/core";
import html2canvas from "html2canvas";

const SvgPaint: React.FC = () => {
  const [fillColor, setFillColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#000000");
  const [selectedPath, setSelectedPath] = useState<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePathClick = (event: React.MouseEvent<SVGPathElement>) => {
    const path = event.target as SVGPathElement;
    path.style.fill = fillColor;
    path.style.stroke = borderColor;
    setSelectedPath(path);
  };

  const downloadAsPNG = async () => {
    if (!selectedPath) {
      alert("Iltimos, avval pathni tanlang!");
      return;
    }

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const clonedPath = selectedPath.cloneNode(true) as SVGPathElement;
    const bbox = selectedPath.getBBox();

    // Set SVG attributes for better quality
    svgElement.setAttribute("width", (bbox.width + 20).toString());
    svgElement.setAttribute("height", (bbox.height + 20).toString());
    svgElement.setAttribute(
      "viewBox",
      `${bbox.x - 10} ${bbox.y - 10} ${bbox.width + 20} ${bbox.height + 20}`
    );

    // Apply selected colors to the cloned path
    clonedPath.style.fill = fillColor;
    clonedPath.style.stroke = borderColor;
    clonedPath.style.strokeWidth = "2";

    svgElement.appendChild(clonedPath);
    const container = document.createElement("div");
    container.appendChild(svgElement);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 2, // Increase scale for better quality
        logging: false,
        width: bbox.width + 20,
        height: bbox.height + 20,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `${selectedPath.getAttribute("title") || "path"}.png`;
      link.href = canvas.toDataURL("image/png", 1.0); // Maximum quality
      link.click();
    } catch (error) {
      console.error("PNG yuklashda xatolik:", error);
      alert("PNG yuklashda xatolik yuz berdi");
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <Box p="md">
      <Box
        mb="md"
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
      >
        <div>
          <label htmlFor="fillColor">To'ldirish rangi: </label>
          <input
            type="color"
            id="fillColor"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="borderColor">Chegara rangi: </label>
          <input
            type="color"
            id="borderColor"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
        </div>
        <Button onClick={downloadAsPNG}>PNG formatda yuklash</Button>
      </Box>

      <svg
        data-v-16d24a67=""
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 919 659"
        fill="#aefdca"
        className="h-auto block max-w-full"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#000000"
        strokeWidth="1"
        version="1.2"
        ref={svgRef}
      >
        <title data-v-16d24a67=""></title>{" "}
        <g data-v-16d24a67="" id="Слой_3" data-name="Слой 3">
          <g
            data-v-16d24a67=""
            id="Самаркандская_область"
            data-name="Самаркандская область"
          >
            <path
              data-v-16d24a67=""
              d="M246.5,349c-2.5,4.75-6,5.75-6,8.5s5.5,6,5.5,10.25l-15-6.5c-4.75,2,.25,17.75,0,20.25s-3.5,1-5.5,2.5-2.5,8.75-2.5,8.75l-8-4.5c-5.5,5.25-3.75,18.75-3.75,18.75l5,2.25V414l-3,3.25-3.25,9.5L159.25,433s-19.5-11-28.5-14.5-26-13.25-26-13.25c-13,2.5-34.13-1.25-34.13-1.25L50.25,365.88,73,363.75l3.88,3.63h5.37l6.63-5.13v-5.37l-2.38-5.63,7.5-.87,1.88-2.63,6.24.5,7.13,4.25,6.37-3.88,3.63,5.26L132,356.5l6,4.25,4.5-1.25s8.88-13.12,8.38-13-.5-7.25-.5-7.25l-6.13-.37-2.37-12.1,7.5,2.72a107.21,107.21,0,0,0,4.74-10.12,91.26,91.26,0,0,0,1.88-9.63l-15.38.13,3.88-14.63,13.88-21.75v-8.25l3.87-2.37h4.87l7.13,9,5.5,3,5.63-.26s5.5,6.88,7.24,8.5,10.63,7.63,10.63,7.63l4.63,10.63L217,308l15.5,6.75s13-1,21.5.5c0,0-7.25,11.49-7.5,15.62S249,344.25,246.5,349Z"
              id="pahtachiyskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M553.67,512.83c-3.17,1.84-4.5,3.34-4.17,7.5s-1.5,3.17-3.67,4.17-2,2.83-2.66,5.5-2.5,1.17-5.67,2.17a4.83,4.83,0,0,0-3.38,4.08L530.38,541l-7.88-2.12-8.25,3.74-10.63.13-5.74,5.63-1.5,9.5-7.5,3.37-5.38,10.87-7.62-1.24-4.88-4-.25-5.88-3.63.25s-.5,11-2.5,13.63c0,0-5.74,2.62-14.24-3s-24.13-15.63-24.13-15.63-10,0-12,1.13l-11,6.12-3.5,4v-10l-13.13.25v-5.37l-6.12-9.76s-3.38,4.76-5.38,6.26-11,8.5-11,8.5l-7.5-.38-15.74,5v11l-10.13,18.5s-13.25,0-17.25-1.38-15.25-5.5-15.25-5.5l-8.87-10.12-1.13-12.75-12.13-3.63,1.76-19.74s-10.5-7.26-14.88-13.76-20.5-29.5-20.5-29.5l-3.38-13.87-18,.37,5.63,14.76S216,510.12,206,516.12l-17.12,1.26-6.26-6.88s-10.12,4.38-13.24,7.5c0,0-24.38-2.88-28.88-2.5s-17.25,1.5-25.62-.5-36.26-6.62-36.26-6.62L67.88,490.5a144.05,144.05,0,0,1,.62-28c1.88-13.5,4.75-24.75,4.75-24.75S74,424,73,418.38,70.62,404,70.62,404s21.13,3.75,34.13,1.25c0,0,17,9.75,26,13.25s28.5,14.5,28.5,14.5L210,426.75l3.25-9.5,3-3.25v-4.75l-5-2.25s-1.75-13.5,3.75-18.75l8,4.5s.5-7.25,2.5-8.75,5.25,0,5.5-2.5-4.75-18.25,0-20.25l15,6.5s6.75,7.25,11.25,7.75a109.5,109.5,0,0,1,15,2.5c6.25,1.5,13.75,5.5,16.5,3.5s2.25-4,6.75-4.25,7.25,1.5,10.5-3.75,1.5-7.5,10.5-7.25,17.25-2,18.25,3.75S331,385.75,331,385.75l2.75,4.75,7.25-3.25a46.94,46.94,0,0,0,11-18l5-1.5,4.5,2.5h5.75s4.75-5,8.75-3.75,9,2.25,4,9-16.25,16-18,18.5-8,5-8.75,8.5a18.9,18.9,0,0,0,0,7l-7,7.5s-4.25-1-5.75,0a7.45,7.45,0,0,0-2.25,3.5l-8,2.25-2.5,4.25s10.75,3.5,10.5,13.75a74.84,74.84,0,0,1-3.5,19.75l4.08,1.17h3.5l3.17,2s8.67-6.67,16.33-25.5,8.5-17.34,9.5-19.84-.16-6.83-.16-6.83l3-4.17s3.5.34,3.5.84-.34,5-.34,5L376,418.33l1.83.34,2-3.69h2.27l-.77,4.35.77,4,6.07-4.33,1.83-5.83,2.83.66.5,3.84-3.16,4.66-2,5.34h3.5l4-7.84,1.83,3-2.17,4.84,3.84,1,5.16-7.67,4.67-.5v-7.17l1.88-5s-1.63-5.83,0-8.16a10.23,10.23,0,0,1,4.6-3.34,9.92,9.92,0,0,1,1.85,5.67v5l-1.85,3.83,1.85,3.65H431.5s4.5-8.15,8.5-11.65,8.24-8.09,8.24-8.09l2.76,4.93,1,7,5.67,2.16L462,414s-4.5,8.33-5.67,12.5-2,7-5.66,9.33L452.5,440l1.5,29.67,6.17,9,1.83,5,5.17,1.5,2.66-2.17,2.84,4.33s-.67,6,1.33,10h9.33l2.67-2.66s-1-5.67,0-5.67,8.33-4.17,8.33-4.17,4.5-8.66,5-8.33,3.67,2,3.67,2l1.33,15.33,28,.17s9.67-7,14.84-7.67,10.73-1,10.73-1c.49,2.31,1.16,5.84,1.93,11C561.5,507.33,556.83,511,553.67,512.83Z"
              id="nurabadskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M367,359.75l-10,8-5,1.5a46.94,46.94,0,0,1-11,18l-7.25,3.25L331,385.75s4.75-10,3.75-15.75-9.25-3.5-18.25-3.75-7.25,2-10.5,7.25-6,3.5-10.5,3.75-4,2.25-6.75,4.25-10.25-2-16.5-3.5a109.5,109.5,0,0,0-15-2.5c-4.5-.5-11.25-7.75-11.25-7.75,0-4.25-5.5-7.5-5.5-10.25s3.5-3.75,6-8.5-.25-14,0-18.13,7.5-15.62,7.5-15.62l2.75,5.75,8.75,4.12,11-5.5,9.75,3.5,12.13.38a18.8,18.8,0,0,0,10.37,3.28c6.5.22,19.25,2.22,25.5,11.47a21.12,21.12,0,0,0,11,2c6.5-.5,22.75.5,23.5,5.5S367,359.75,367,359.75Z"
              id="narpayskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M450.67,377.17c-4,2-6.34,1.08-6.34,1.08s-2.83,2.42-2.16,2.92,3.83,6.16,3.83,6.16l.33,4.5,1.91,3.41s-4.24,4.59-8.24,8.09S431.5,415,431.5,415H417.33l-1.85-3.65,1.85-3.83v-5a9.92,9.92,0,0,0-1.85-5.67,10.23,10.23,0,0,0-4.6,3.34c-1.63,2.33,0,8.16,0,8.16l-1.88,5v7.17l-4.67.5-5.16,7.67-3.84-1,2.17-4.84-1.83-3-4,7.84h-3.5l2-5.34,3.16-4.66-.5-3.84-2.83-.66L388.17,419l-6.07,4.33-.77-4,.77-4.35h-2.27l-2,3.69-1.83-.34,1.33-5.16s.34-4.5.34-5-3.5-.84-3.5-.84l-3,4.17s1.16,4.33.16,6.83-1.83,1-9.5,19.84-16.33,25.5-16.33,25.5l-3.17-2h-3.5l-4.08-1.17a74.84,74.84,0,0,0,3.5-19.75c.25-10.25-10.5-13.75-10.5-13.75l2.5-4.25,8-2.25a7.45,7.45,0,0,1,2.25-3.5c1.5-1,5.75,0,5.75,0l7-7.5a18.9,18.9,0,0,1,0-7c.75-3.5,7-6,8.75-8.5s13-11.75,18-18.5,0-7.75-4-9-8.75,3.75-8.75,3.75H361.5l-4.5-2.5,10-8s2.5-9,1.75-14-17-6-23.5-5.5a21.12,21.12,0,0,1-11,2c-6.25-9.25-19-11.25-25.5-11.47a18.8,18.8,0,0,1-10.37-3.28s5.87-5.38,8.74-6.25c8.26-3.75,26.63-3.75,26.63-3.75l2.13-7.5,9.5-4.12s10.74.24,10.87-.13,4.13-7,4.13-7l-4.26-10.37s7.63-6.63,8.13-8.26-.63-4.5,1.13-6,5.62-5.74,6-10.62L365,256.75l-1.25,7s-4.25,3.87-9.5,4.13l-6.75-7.76.12-8.87s3.76-14.13,3.76-14.5S362,222.62,364.62,217a94.78,94.78,0,0,1,7.5-12.38,17.6,17.6,0,0,0,7.05,1.71c4.66.34,9.33-.16,12.5.84s9.16,7.66,9.16,7.66,3,.63,2.17-5.1c0,0,4.33-2.58,6.83,0s2.46,4.09,5.65,4.43,9,0,12.19.68c1.61.33,5.11,2,8.67,4h0l-1.51,13.69,1.51,1.33v2.67l-3.17,1.17s-1,5.33,0,8.33.89,7.67,1.36,8.5,2.47,3.83,5.47,4,6.83-.5,7.67,2.5-2.5,7.5-2.5,7.5l.16,10.83a15,15,0,0,1-5.07,5.17s-3.32,7.83-7.54,10.67-7.05,3.33-8.72,7.33a29.65,29.65,0,0,0-1.83,9H413.5l4.17,12,.66,7.37,4.17,3.63s-3.17,10.5-1.83,19.5c0,0,7.5-.17,10.66,1.33s16.47,11,16.47,11,6.53,1,6.7,1.53S454.67,375.17,450.67,377.17Z"
              id="kattakurganskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M553.6,214.33l5.47,5.34v5.66l-1.24,3.34H549.5l-1.38,6.5-20.62-.84L522.17,239v3.67l-4.67,2.16s2.5,16.5,10,15.67l1.5-7.17,6.5,2.17,5.17,8.17-1.84,8.83s-6.33,4.33-11.5,4.83-10.5-4.16-10.5-4.16-.83-.67-5.33,0-6.83,10.33-9.17,13.66-9.83,10.67-14.5,13-20.66-2.83-21.5-3-2-3.83-2.5-3.83,3.84-7.67,4-8.33,10-9.17,10-9.17a15.17,15.17,0,0,0,0-6.83,19,19,0,0,0-3.66-7.34s-.17-8,0-10.5,4-2.33,1.66-8c-1.33-4.16-11-1.83-11-1.83s-4.66-2.5-7.16-6-8.67-8.83-12.5-11.17c-1.89-1.15-5.39-3.18-8.83-5h0c-3.56-1.91-7.06-3.62-8.67-4-3.17-.64-9-.35-12.19-.68s-3.15-1.84-5.65-4.43-6.83,0-6.83,0c.83,5.73-2.17,5.1-2.17,5.1s-6-6.66-9.16-7.66-7.84-.5-12.5-.84a17.6,17.6,0,0,1-7.05-1.71l-.12-7-3.25-3.12,6.63-4.62,3.24-16-4-3.88,4.26-12.25-4.26-3.87L376,143.25l7.25-.75,2.87-5.38-4.37-3.37.63-17.5,3.74-4.75-2.74-4.38,2.24-15.74,6.88-5.26,10.38-15s-2.13-24.37-1.76-24.62,16.5,7.88,16.88,7.75,29.25,2.37,29.25,2.37L445.88,77.5l3.87-.25,3.75,5.25,17.12,3.12L482,101.25l13.5,1.37.12,4.13-7.12,1.75s-1.5,3.88-.38,6.12,7.26,5.38,7.26,5.38l6.5-.5,12.37,3.75-7,17.13,3.75,4.87s7.88.13,8.62-1,5.5-7.75,10.76-6.63,7.5,8.88,7.5,8.88l10.24,1.12s3.21,8.71,5.21,13,5.67,8.66,5.67,9.16.17,20,0,20.67-7.17,19.17-6.67,19.17S553.6,214.33,553.6,214.33Z"
              id="koshrabadskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M609.33,356.83l-2.83,3.67,2.83,9.17,17.84,11.16,1,4.17-9.45,6.67h-6.55l-3-2.34-4.34.17-.16,6.83L601.33,399v4l7,7.18V417l-8-3s-12.33-8.33-12.83-8.5-11.83-7.83-11.83-7.83-23.34-31.5-25.67-35.34-10.67-5.5-10.67-5.5c-2.66-6.16-7.16-4.83-10.5-5.5s-5.66-4.16-7.66-7-7.17-6-8.34-8.83,0-14,0-14,5.67-3.33,8.84-6.83,2.33-11.34,4-12.67,9.5-1.56,9.5-1.56l3-3.94,6,.33s5.83,3,9.83,2.84,6.33-3.17,7.83-5.84-2.76-8.33-2.76-8.33.6-5.33-2.07-6.17-7.5,8.17-11.33,3.34c-.67-4.34,2.5-6,3.16-10.17a5.47,5.47,0,0,0-2.5-5.83H544l-3.33-3-5.17-8.17-6.5-2.17-1.5,7.17c-7.5.83-10-15.67-10-15.67l4.67-2.16V239l5.33-4.67,20.62.84,1.38-6.5h8.33l1.24-3.34v-5.66l-5.47-5.34s-.77-4.66-1.27-4.66,6.5-18.5,6.67-19.17,0-20.17,0-20.67-3.67-4.83-5.67-9.16-5.21-13-5.21-13,17.5-6.87,34-5l-2.62,8s6.12,9.76,6,11.63-3.5,8.25-3.5,8.25a176.55,176.55,0,0,1-.12,18.25c-.63,7.37-1.5,15.13-2.38,18.63s-4.25,12.87-4.5,15.24a39.73,39.73,0,0,0-.12,5.13s10.87,5,14.24,5.87c0,0,11,9,11.63,9s-2.37,6.5-2.37,6.5l3.62,2.76s5.62-3.13,8.5-3.26c0,0,1.75,6.13-1.38,9.88s-10.5,11-12.24,11.25-7.26,2-7.26,2,1.63,7.13,4.26,7.63a33.75,33.75,0,0,0,7.37,0l7.87,1.74s11,12.88,15.88,15.13l2.38,8.87V318.5s-8.76,7.12-8.26,7.38S625.88,336,625.88,336l5.06-2.44v11.77l-4.44,5-5.5,1.5L618.33,355v1.83Z"
              id="payarikskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M667.83,434.33c-.26,3.89,7.37,13.42,7.84,14l-.5,11.67,5.83,8.33L677.79,476v5.77a135.3,135.3,0,0,1-23-14.6s-7.5.5-10.33-3.17-4.33-7.17-9.33-6.33c0,0-3.84-7-4.23-7.5s-3.27-1-5.27-3.67a92.3,92.3,0,0,1-5.34-9.17l-4.2-8.16L608.33,417v-6.83l-7-7.18v-4l3.34-2.67.16-6.83,4.34-.17,3,2.34h6.55l9.45-6.67-1-4.17-17.84-11.16-2.83-9.17,2.83-3.67h9V355l2.67-3.17,5.5-1.5,4.44-5V333.56l5.56-2.68s2.75,17.12,2.62,17.5,5.13,4.87,5.13,4.87,9.75,2.13,14.75-2l3.12,4.5h4V351l8.63.25,1.87,7.13,6.88,2.5-2.83,4.29s-10.5,3.33-12.5,8.66-1.34,11.84-1.34,12.34,3.5,2.33,3.5,4.66-5.16,6-4.33,13.34L682.5,417l7.17,6.17v3.5l-10.34.83-4,3.67S668.1,430.45,667.83,434.33Z"
              id="djambayskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M635.17,457.67l-.67,4.5s-7.17-.34-7.17,0-.16,3.33-.16,3.33l-2.84,3.67,1.67,11.5-2,4.5h-5s-3.83-1.67-5.17,0,5.34,5.5,5.34,5.5l2,4.83-2.92,1.83s4.42,8.5,1.08,11.67-11.16-1.33-11,3.5,5.5,4,4.5,8.67-2.16,8.16-8.5,9.5-7.83,0-9.83,2.5-4.67,6-4.67,6l-3.5-1.17s-1.16-4.67-5.33-4.67-4.17,3.34-6.17,4.17-9.83-1.67-10.33,2.67,3.75,8.08,3.75,8.08a47.2,47.2,0,0,1-9.87,1C554.5,549,546,548,546,548l-5.12-6.25-.76-5-6-.5a4.83,4.83,0,0,1,3.38-4.08c3.17-1,5,.5,5.67-2.17s.5-4.5,2.66-5.5,4,0,3.67-4.17,1-5.66,4.17-7.5,7.83-5.5,6.16-16.5c-.77-5.13-1.44-8.66-1.93-11-.57-2.65-.9-3.69-.9-3.69l-2.83-3.34-.17-8.66s7.67-7.84,14-7.84c0,0,4.33-5.5,8-7.83a56.72,56.72,0,0,0,5.83-4.17l3-6s-3.33-10.33-7-10.83-9.5.5-9.5,0-1.5-5-1.5-5l-2.66-2.5-1.34-4.67.34-4.33-17-7.5-.67-4.67h5.83a13.88,13.88,0,0,1,2-1.33c.5-.17,3.84,1.33,3.84,1.33l5-.67,4.18,2,3.17,5.16,3.17,2.17,1.16,7.33s9.5,2.34,10,2.67,6.84,5.33,6.84,5.33H597l12.17,7.17,11.16,1.83a92.3,92.3,0,0,0,5.34,9.17c2,2.67,4.87,3.17,5.27,3.67S635.17,457.67,635.17,457.67Z"
              id="samarkandskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M771.5,397.25l-1.38,3.87-11.62-.87-4.75,3.87-1.13,8.76s-13.37,9.37-17.74,21.87l.37,22.63h5.13l.87,3.5s6-.5,6.37,0,6.5,4.74,6.5,4.74-1.12,2.63-.37,7.26a68.23,68.23,0,0,1,.63,10.37l-2.38,3.5c-2.75.87-13.62-4.63-16.88-3.75l-3,6.38-.12,9.24-6.9-3.83-2.93-1.62-17-.34a161.24,161.24,0,0,1-27.38-11.06V476l3.21-7.67L675.17,460l.5-11.67c-.47-.58-8.1-10.11-7.84-14s7.5-3.16,7.5-3.16l4-3.67,10.34-.83v-3.5L682.5,417,666,404.17c-.83-7.34,4.33-11,4.33-13.34s-3.5-4.16-3.5-4.66-.66-7,1.34-12.34,12.5-8.66,12.5-8.66l2.83-4.29,5.75-.76L693,361.5l10.75.75,4.5-4.75,9.5.25,5.75,2.13,6.25.12,3.13-2.62,3.87-1,2,2.87-2.87,5.63s11.62,10.37,12,10.37,7.24,2.63,7.24,2.63l2.13,7.62A34.5,34.5,0,0,1,771.5,397.25Z"
              id="bulungurskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M762,575.5l-1.38,3.38-10.5-2.13a48.72,48.72,0,0,0-11.37,3.63c-5,2.5-17.25,6.74-17.25,6.74l-1.75,2.76s-10.87,4.5-16.37,4.12-26.26-4.75-33.88-7.38l-1,3.26-4.75,3.24s-3.75-5.62-3.75-6,.12-3.74.12-3.74l-6.24-4.76-25.76-.24L623,579.75l-.25,7.13,3,9.62L612.5,613.88l-5.38,1.37.13-3.13-3.13-6s-13.12,3.26-17,3-9.87-1.24-9.87-1.24l-3,4L567,609.12v-5.24l2.12-4.13,2.38.25s-.5-8,1.75-13.62c0,0-4.75-8.5-4.13-14.5s2.13-12.76,2.13-12.76l-3-10.87s-4.25-3.75-3.75-8.08,8.33-1.84,10.33-2.67,2-4.17,6.17-4.17,5.33,4.67,5.33,4.67l3.5,1.17s2.67-3.5,4.67-6,3.5-1.17,9.83-2.5,7.5-4.84,8.5-9.5,4.33-3.84,4.5-8.67-7.67-.33-11-3.5-1.08-11.67-1.08-11.67l2.92-1.83s2.33,4.67,2.83,4.33,11.17-5.83,20-2.5c0,0,11,15.84,20,17s11.83,1,11.83,1l6.84-8.66,16.66.5,3.5-5,10.84.83a16.59,16.59,0,0,1,8.5-2.67l2.93-5.54,6.9,3.83s14.62,32.5,16.75,39S762,575.5,762,575.5Z"
              id="urgutskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M561.83,293.83c-1.5,2.67-3.83,5.67-7.83,5.84s-9.83-2.84-9.83-2.84l-6-.33-3,3.94s-7.84.23-9.5,1.56-.84,9.17-4,12.67-8.84,6.83-8.84,6.83-1.16,11.17,0,14,6.34,6,8.34,8.83,4.33,6.34,7.66,7,7.84-.66,10.5,5.5H530.5l-14-8s-6.17-6.16-9.83-6a14.24,14.24,0,0,0-6.84,2.5s-8-3-8.83-1.66-.5,3.16.83,7.33,5.34,7.33,4.5,18.67-5.12,18.45-5.12,18.45l-11.71-5.29-5.67-5.16L461.33,370l-6.83-2.17c-.17-.5-6.7-1.53-6.7-1.53s-13.3-9.47-16.47-11S420.67,354,420.67,354c-1.34-9,1.83-19.5,1.83-19.5l-4.17-3.63-.66-7.37-4.17-12h8.67a29.65,29.65,0,0,1,1.83-9c1.67-4,4.5-4.5,8.72-7.33s7.54-10.67,7.54-10.67a15,15,0,0,0,5.07-5.17l-.16-10.83s3.33-4.5,2.5-7.5-4.67-2.33-7.67-2.5-5-3.17-5.47-4-.36-5.5-1.36-8.5,0-8.33,0-8.33l3.17-1.17v-2.67l-1.51-1.33,1.51-13.69c3.44,1.84,6.94,3.87,8.83,5,3.83,2.34,10,7.67,12.5,11.17s7.16,6,7.16,6,9.67-2.33,11,1.83c2.34,5.67-1.5,5.5-1.66,8s0,10.5,0,10.5a19,19,0,0,1,3.66,7.34,15.17,15.17,0,0,1,0,6.83s-9.83,8.5-10,9.17-4.5,8.33-4,8.33,1.67,3.67,2.5,3.83,16.84,5.34,21.5,3,12.17-9.66,14.5-13,4.67-13,9.17-13.66,5.33,0,5.33,0,5.34,4.66,10.5,4.16,11.5-4.83,11.5-4.83l1.84-8.83,3.33,3h2.33a5.47,5.47,0,0,1,2.5,5.83c-.66,4.17-3.83,5.83-3.16,10.17,3.83,4.83,8.66-4.17,11.33-3.34s2.07,6.17,2.07,6.17S563.33,291.17,561.83,293.83Z"
              id="ishtihanskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M584.83,443.83l-3,6A56.72,56.72,0,0,1,576,454c-3.67,2.33-8,7.83-8,7.83-6.33,0-14,7.84-14,7.84l.17,8.66,2.83,3.34s.33,1,.9,3.69c0,0-5.57.31-10.73,1S532.33,494,532.33,494l-28-.17L503,478.5s-3.17-1.67-3.67-2-5,8.33-5,8.33S487,489,486,489s0,5.67,0,5.67l-2.67,2.66H474c-2-4-1.33-10-1.33-10L469.83,483l-2.66,2.17-5.17-1.5-1.83-5-6.17-9L452.5,440l-1.83-4.17c3.66-2.33,4.5-5.16,5.66-9.33S462,414,462,414l-4.33-4.67L452,407.17l-1-7-2.76-4.93-1.91-3.41-.33-4.5s-3.17-5.66-3.83-6.16,2.16-2.92,2.16-2.92,2.34.92,6.34-1.08,4-8.84,3.83-9.34l6.83,2.17,12.5,7.67,5.67,5.16,11.71,5.29L508.67,396l20.16,4.33,16.67,4,.67,4.67,17,7.5-.34,4.33,1.34,4.67,2.66,2.5s1.5,4.5,1.5,5,5.84-.5,9.5,0S584.83,443.83,584.83,443.83Z"
              id="pastdargomskiy-rayon"
              onClick={handlePathClick}
            ></path>{" "}
            <path
              data-v-16d24a67=""
              d="M620.33,437.33l-11.16-1.83L597,428.33h-6.33s-6.34-5-6.84-5.33-10-2.67-10-2.67L572.67,413l-3.17-2.17-3.17-5.16-4.18-2-5,.67s-3.34-1.5-3.84-1.33a13.88,13.88,0,0,0-2,1.33H545.5l-16.67-4L508.67,396l-17.46-7.88s4.29-7.12,5.12-18.45-3.16-14.5-4.5-18.67-1.66-6-.83-7.33-1.66-6.5-1.66-6.5l-3.17-1.17s-2.67-3.5-4.67-6-3.5-1.17-9.83-2.5-7.5-4.84-8.5-9.5,4.33-3.84,4.5-8.67-7.67-.33-11-3.5-1.08-11.67-1.08-11.67l2.92-1.83s2.33,4.67,2.83,4.33,11.17-5.83,20-2.5c0,0,11,15.84,20,17s11.83,1,11.83,1l6.84-8.66,16.66.5,3.5-5,10.84.83a16.59,16.59,0,0,1,8.5-2.67l2.93-5.54,6.9,3.83s14.62,32.5,16.75,39S725.1,494.79,725.1,494.79Z"
              id="taylakskiy-rayon"
              onClick={handlePathClick}
            ></path>
          </g>
        </g>
      </svg>
    </Box>
  );
};

export default SvgPaint;
