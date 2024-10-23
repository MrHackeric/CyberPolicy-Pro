import * as pdfjsLib from 'pdfjs-dist/build/pdf'; // Correct import for pdfjsLib
import mammoth from 'mammoth'; // Use mammoth for DOCX text extraction

// Manually set the worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Extract text from PDF
export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let extractedText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          extractedText += item.str + ' ';
        });
      }
      resolve(extractedText.trim());
    };
    reader.onerror = reject;
  });
};

// Extract text from DOCX using mammoth.js
export const extractTextFromDocx = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value); // Extracted raw text
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
  });
};

// Extract text from TXT
export const extractTextFromTxt = async (file) => {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = reject;
  });
};

// Main function to extract text from different file types
export const extractText = async (file) => {
  const fileType = file.name.split('.').pop().toLowerCase();

  if (fileType === 'pdf') {
    return await extractTextFromPDF(file);
  } else if (fileType === 'docx') {
    return await extractTextFromDocx(file);
  } else if (fileType === 'txt') {
    return await extractTextFromTxt(file);
  }

  throw new Error('Unsupported file format');
};
