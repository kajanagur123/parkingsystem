import jsPDF from 'jspdf';

interface PDFData {
  bikeNumber: string;
  phoneNumber: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  fare: number;
  spotId: string;
  pin: string;
}

export const generatePDF = async (data: PDFData): Promise<void> => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(37, 99, 235); // Blue color
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SMARTPARK', 20, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Smart Parking Receipt', 20, 35);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Receipt title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PARKING RECEIPT', 20, 60);
  
  // Add line
  doc.setLineWidth(0.5);
  doc.line(20, 65, 190, 65);
  
  // Receipt details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const details = [
    { label: 'Receipt ID:', value: `RCP-${data.pin}-${Date.now().toString().slice(-6)}` },
    { label: 'Parking Spot:', value: data.spotId },
    { label: 'PIN Used:', value: data.pin },
    { label: 'Bike Number:', value: data.bikeNumber },
    { label: 'Phone Number:', value: data.phoneNumber },
    { label: 'Check-in Time:', value: data.checkInTime },
    { label: 'Check-out Time:', value: data.checkOutTime },
    { label: 'Duration:', value: calculateDuration(data.checkInTime, data.checkOutTime) },
    { label: 'Rate:', value: '₹15 per hour' }
  ];
  
  let yPosition = 80;
  details.forEach(detail => {
    doc.setFont('helvetica', 'bold');
    doc.text(detail.label, 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 80, yPosition);
    yPosition += 10;
  });
  
  // Total amount box
  doc.setFillColor(34, 197, 94); // Green color
  doc.rect(20, yPosition + 10, 170, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT:', 25, yPosition + 22);
  doc.text(`₹${data.fare}`, 150, yPosition + 22);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Footer
  yPosition += 50;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for using SmartPark!', 20, yPosition);
  doc.text('For support, contact: support@smartpark.com', 20, yPosition + 10);
  doc.text('Phone: +91 98765 43210', 20, yPosition + 20);
  
  // Add timestamp
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, yPosition + 40);
  
  // QR code placeholder (text representation)
  doc.setFontSize(8);
  doc.text('QR Code for verification would appear here', 140, yPosition + 30);
  doc.rect(140, yPosition + 5, 40, 20);
  
  // Save the PDF
  const filename = `parking-receipt-${data.bikeNumber.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}.pdf`;
  doc.save(filename);
  
  // Simulate email sending (in real app, this would be an API call)
  if (data.email) {
    console.log(`PDF receipt would be emailed to: ${data.email}`);
  }
};

const calculateDuration = (checkIn: string, checkOut: string): string => {
  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);
  const diffInMs = checkOutTime.getTime() - checkInTime.getTime();
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
  const hours = Math.floor(diffInHours);
  const minutes = Math.round((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
  }
};