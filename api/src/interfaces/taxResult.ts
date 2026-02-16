/**
 * Interface for tax result
 * @property ccss CCSS deduction
 * @property incomeTax Income tax deduction
 * @property netSalary Net salary
 */
export interface TaxResult {
  ccss: number;
  incomeTax: number;
  netSalary: number;
}
