// backend/src/services/calculations.service.ts
import { Injectable } from "@nestjs/common";
import { TaxResult } from "src/interfaces/taxResult";


@Injectable()
export class CalculationsService {
    // CCSS rates (SEM + IVM)
    private readonly CCSS_RATE = 0.1083;

    // Income tax brackets (Ejemplo)
    private readonly TAX_BRACKETS = [
        { limit: 929000, rate: 0 },
        { limit: 1363000, rate: 0.1 },
        { limit: 2392000, rate: 0.15 },
        { limit: 4783000, rate: 0.2 },
        { limit: Infinity, rate: 0.25 },
    ];

    /**
     * Calculate statutory deductions
     * @param grossSalaryCRC Gross salary in CRC
     * @returns Tax result
     */
    public calculateStatutoryDeductions(grossSalaryCRC: number): TaxResult {
        const ccss = grossSalaryCRC * this.CCSS_RATE;
        const incomeTax = this.calculateProgressiveTax(grossSalaryCRC);

        return {
            ccss,
            incomeTax,
            netSalary: grossSalaryCRC - ccss - incomeTax,
        };
    }

    /**
     * Calculate progressive tax
     * @param salary Salary
     * @returns Progressive tax
     */
    private calculateProgressiveTax(salary: number): number {
        let tax = 0;

        // Progressive tax brackets (Simplified logic)
        // 10%
        if (salary > 929000) {
            const taxable = Math.min(salary, 1363000) - 929000;
            tax += taxable * 0.1;
        }
        // 15%
        if (salary > 1363000) {
            const taxable = Math.min(salary, 2392000) - 1363000;
            tax += taxable * 0.15;
        }
        // 20%
        if (salary > 2392000) {
            const taxable = Math.min(salary, 4783000) - 2392000;
            tax += taxable * 0.2;
        }
        // 25%
        if (salary > 4783000) {
            const taxable = salary - 4783000;
            tax += taxable * 0.25;
        }

        return tax;
    }

    /**
     * Provision for fixed monthly expenses (Divided into fortnights)
     * @param monthlyAmount Monthly amount
     * @returns Provision for fixed monthly expenses
     */
    public provisionForExpense(monthlyAmount: number): number {
        return monthlyAmount / 2;
    }
}
