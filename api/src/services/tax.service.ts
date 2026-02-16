export class TaxService {
  /**
   * Calculate CCSS deduction (Costa Rica Social Security)
   * @param grossSalary Gross monthly salary
   * @returns CCSS deduction amount
   */
  static calculateCCSS(grossSalary: number): number {
    return grossSalary * 0.1083; // 10.83%
  }

  /**
   * Calculate Income Tax based on Costa Rica progressive brackets (2024)
   * @param grossSalary Gross monthly salary
   * @returns Income tax amount
   */
  static calculateIncomeTax(grossSalary: number): number {
    // Exempt up to ₡918,000 mensuales
    if (grossSalary <= 918000) {
      return 0;
    }
    let tax = 0;
    // Bracket 1: ₡918,000 - ₡1,347,000 (10%)
    if (grossSalary > 918000) {
      const taxableInBracket = Math.min(grossSalary - 918000, 429000);
      tax += taxableInBracket * 0.1;
    }
    // Bracket 2: ₡1,347,000 - ₡2,364,000 (15%)
    if (grossSalary > 1347000) {
      const taxableInBracket = Math.min(grossSalary - 1347000, 1017000);
      tax += taxableInBracket * 0.15;
    }
    // Bracket 3: ₡2,364,000 - ₡4,727,000 (20%)
    if (grossSalary > 2364000) {
      const taxableInBracket = Math.min(grossSalary - 2364000, 2363000);
      tax += taxableInBracket * 0.2;
    }
    // Bracket 4: Más de ₡4,727,000 (25%)
    if (grossSalary > 4727000) {
      const taxableInBracket = grossSalary - 4727000;
      tax += taxableInBracket * 0.25;
    }
    return tax;
  }

  /**
   * Calculate net salary after all deductions
   * @param grossSalary Gross monthly salary
   * @returns Object with all deductions and net salary
   */
  static calculateNetSalary(grossSalary: number) {
    const ccss = this.calculateCCSS(grossSalary);
    const incomeTax = this.calculateIncomeTax(grossSalary);
    const netSalary = grossSalary - ccss - incomeTax;

    return {
      grossSalary,
      ccss,
      incomeTax,
      netSalary,
      totalDeductions: ccss + incomeTax
    };
  }
}
