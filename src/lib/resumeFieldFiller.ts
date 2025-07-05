import { ResumeData } from '@/types/resume';

interface FieldMapping {
  originalField: string;
  refactoredField: string;
  similarity: number;
}

export class ResumeFieldFiller {
  /**
   * Fills empty fields in refactored resume with data from original resume
   */
  static fillEmptyFields(originalResume: ResumeData, refactoredResume: any): any {
    const filledResume = { ...refactoredResume };

    // Direct field mappings (exact matches)
    const directMappings = [
      { original: 'name', refactored: 'name' },
      { original: 'about', refactored: 'about' },
      { original: 'location', refactored: 'location' },
      { original: 'linkedin', refactored: 'linkedin' },
      { original: 'github', refactored: 'github' },
      { original: 'portfolio', refactored: 'portfolio' },
      { original: 'skills', refactored: 'skills' },
      { original: 'soft_skills', refactored: 'soft_skills' },
      { original: 'extracurricular', refactored: 'extracurricular' }
    ];

    // Fill direct mappings
    directMappings.forEach(mapping => {
      if (this.isFieldEmpty(filledResume[mapping.refactored]) && 
          !this.isFieldEmpty(originalResume[mapping.original as keyof ResumeData])) {
        filledResume[mapping.refactored] = originalResume[mapping.original as keyof ResumeData];
      }
    });

    // Handle education array
    if (this.isArrayEmpty(filledResume.education) && !this.isArrayEmpty(originalResume.education)) {
      filledResume.education = originalResume.education;
    } else if (filledResume.education && originalResume.education) {
      filledResume.education = this.fillArrayFields(
        filledResume.education,
        originalResume.education,
        ['degree', 'institution', 'year', 'gpa', 'description']
      );
    }

    // Handle work experience array
    if (this.isArrayEmpty(filledResume.work_experience) && !this.isArrayEmpty(originalResume.work_experience)) {
      filledResume.work_experience = originalResume.work_experience;
    } else if (filledResume.work_experience && originalResume.work_experience) {
      filledResume.work_experience = this.fillArrayFields(
        filledResume.work_experience,
        originalResume.work_experience,
        ['title', 'company', 'location', 'startDate', 'endDate', 'description', 'achievements']
      );
    }

    // Handle projects array
    if (this.isArrayEmpty(filledResume.projects) && !this.isArrayEmpty(originalResume.projects)) {
      filledResume.projects = originalResume.projects;
    } else if (filledResume.projects && originalResume.projects) {
      filledResume.projects = this.fillArrayFields(
        filledResume.projects,
        originalResume.projects,
        ['title', 'description', 'startDate', 'endDate', 'technologies', 'url']
      );
    }

    return filledResume;
  }

  /**
   * Check if a field is empty or null/undefined
   */
  private static isFieldEmpty(field: any): boolean {
    if (field === null || field === undefined) return true;
    if (typeof field === 'string') return field.trim() === '';
    if (Array.isArray(field)) return field.length === 0;
    return false;
  }

  /**
   * Check if an array is empty
   */
  private static isArrayEmpty(array: any[]): boolean {
    return !array || array.length === 0;
  }

  /**
   * Fill empty fields in array items with data from original array
   */
  private static fillArrayFields(
    refactoredArray: any[],
    originalArray: any[],
    fieldNames: string[]
  ): any[] {
    if (!refactoredArray || refactoredArray.length === 0) {
      return originalArray;
    }

    return refactoredArray.map((refactoredItem, index) => {
      const originalItem = originalArray[index];
      if (!originalItem) return refactoredItem;

      const filledItem = { ...refactoredItem };

      fieldNames.forEach(fieldName => {
        if (this.isFieldEmpty(filledItem[fieldName]) && 
            !this.isFieldEmpty(originalItem[fieldName])) {
          filledItem[fieldName] = originalItem[fieldName];
        }
      });

      return filledItem;
    });
  }

  /**
   * Find similar fields between original and refactored resume
   */
  static findSimilarFields(originalResume: ResumeData, refactoredResume: any): FieldMapping[] {
    const mappings: FieldMapping[] = [];
    const originalKeys = Object.keys(originalResume);
    const refactoredKeys = Object.keys(refactoredResume);

    originalKeys.forEach(originalKey => {
      refactoredKeys.forEach(refactoredKey => {
        const similarity = this.calculateSimilarity(originalKey, refactoredKey);
        if (similarity > 0.7) { // 70% similarity threshold
          mappings.push({
            originalField: originalKey,
            refactoredField: refactoredKey,
            similarity
          });
        }
      });
    });

    return mappings.sort((a, b) => b.similarity - a.similarity);
  }

  /**
   * Calculate string similarity using Levenshtein distance
   */
  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
} 