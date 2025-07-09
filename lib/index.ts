import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateYMD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${day}-${month}-${year}`;
}

export const exportToCSV = (filteredProducts: Product[]) => {
  const dataToExport = filteredProducts;

  const headers = [
    'ID',
    'Name',
    'SKU',
    'EAN',
    'Sales',
    'Stock Available',
    'Product Number',
    'Vendor',
  ];
  const csvContent = [
    headers.join(','),
    ...dataToExport.map((product) =>
      [
        `"${product.id || ''}"`,
        `"${product.name || ''}"`,
        `"${product.manufacturerNumber || ''}"`,
        `"${product.ean || ''}"`,
        product.sales || 0,
        product.availableStock || 0,
        `"${product.productNumber || ''}"`,
        `"${product.manufacturer?.name || ''}"`,
      ].join(',')
    ),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `products-${timestamp}.csv`;

    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
