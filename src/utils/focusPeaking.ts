export const applyFocusPeaking = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const sobelData = new Uint8ClampedArray(data.length);

  const sobel = (x: number, y: number) => {
    const kernelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ];
    const kernelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ];

    let pixelX = 0;
    let pixelY = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const pixel = ((y + i) * width + (x + j)) * 4;
        const r = data[pixel];
        const g = data[pixel + 1];
        const b = data[pixel + 2];
        const gray = (r + g + b) / 3;

        pixelX += gray * kernelX[i + 1][j + 1];
        pixelY += gray * kernelY[i + 1][j + 1];
      }
    }

    return Math.sqrt(pixelX * pixelX + pixelY * pixelY);
  };

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pixel = (y * width + x) * 4;
      const edge = sobel(x, y);

      if (edge > 128) {
        sobelData[pixel] = 255; // Red
        sobelData[pixel + 1] = 0; // Green
        sobelData[pixel + 2] = 0; // Blue
        sobelData[pixel + 3] = 255; // Alpha
      } else {
        sobelData[pixel + 3] = 0; // Transparent
      }
    }
  }

  context.putImageData(new ImageData(sobelData, width, height), 0, 0);
};
