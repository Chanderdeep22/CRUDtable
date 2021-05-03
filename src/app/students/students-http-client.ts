import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Student } from './student';
import { StudentsList } from './students-list';
import { Response } from './response';
import { TableFilter } from '../table-filters/table-filter';

/* tslint:disable */
/**
 * Hardcoded student detail data that's used for the example application instead of making REST calls.
 */

/**
 * The class that makes REST calls to retrieve, add, update and delete students and student detail records.
 */
export class StudentsHttpClient {

    /**
     * Hardcoded student data that's used for the example application instead of making REST calls.
     */
    STUDENTS: Student[] = [
        { studentId: 1, studentSchoolId: 'M1000001', firstName: 'Ron', lastName: 'Black', studentEmail: 'rb@sappro.com' },
        { studentId: 2, studentSchoolId: 'M1000002', firstName: 'Jari', lastName: 'Johnson', studentEmail: 'jj@sappro.com' },
        { studentId: 3, studentSchoolId: 'M1000003', firstName: 'Steve', lastName: 'Tran', studentEmail: 'st@sappro.com' },
        { studentId: 4, studentSchoolId: 'M1000004', firstName: 'Betty', lastName: 'Crocker', studentEmail: 'bc@sappro.com' },
        { studentId: 5, studentSchoolId: 'M1000005', firstName: 'Phil', lastName: 'Jackson', studentEmail: 'pj@sappro.com' },
        { studentId: 6, studentSchoolId: 'M1000006', firstName: 'Trish', lastName: 'Warren', studentEmail: 'tw@sappro.com' },
        { studentId: 7, studentSchoolId: 'M1000007', firstName: 'Becky', lastName: 'Long', studentEmail: 'bl@sappro.com' },
        { studentId: 8, studentSchoolId: 'M1000008', firstName: 'Ronda', lastName: 'Pierce', studentEmail: 'rp@sappro.com' },
        { studentId: 9, studentSchoolId: 'M1000009', firstName: 'Denise', lastName: 'Stephenson', studentEmail: 'ds@sappro.com' },
        { studentId: 10, studentSchoolId: 'M1000010', firstName: 'Frank', lastName: 'Lawson', studentEmail: 'fl@sappro.com' },
        { studentId: 11, studentSchoolId: 'M1000011', firstName: 'Eva', lastName: 'Guillot', studentEmail: 'eg@sappro.com' },
        { studentId: 12, studentSchoolId: 'M1000012', firstName: 'James', lastName: 'Smith', studentEmail: 'js@sappro.com' },
        { studentId: 13, studentSchoolId: 'M1000013', firstName: 'Sam', lastName: 'Garland', studentEmail: 'sg@sappro.com' },
        { studentId: 14, studentSchoolId: 'M1000014', firstName: 'Hillary', lastName: 'Dutton', studentEmail: 'hd@sappro.com' },
        { studentId: 15, studentSchoolId: 'M1000015', firstName: 'Simon', lastName: 'Shuster', studentEmail: 'ss@sappro.com' },
        { studentId: 16, studentSchoolId: 'M1000016', firstName: 'Ray', lastName: 'Sutton', studentEmail: 'rs@sappro.com' },
        { studentId: 17, studentSchoolId: 'M1000017', firstName: 'Luke', lastName: 'Hadnot', studentEmail: 'lh@sappro.com' },
        { studentId: 18, studentSchoolId: 'M1000018', firstName: 'Dave', lastName: 'Klein', studentEmail: 'dk@sappro.com' },
        { studentId: 19, studentSchoolId: 'M1000019', firstName: 'John', lastName: 'Anderson', studentEmail: 'ja@sappro.com' },
        { studentId: 20, studentSchoolId: 'M1000020', firstName: 'Roland', lastName: 'Hug', studentEmail: 'rh@sappro.com' }
    ];

    constructor() { }

    /**
     * Returns students based on the sorting, paging and filtering parameters.
     *
     * @param sortColumn the column used to sort the results
     * @param sortDirection the sort direction ('asc' or 'desc')
     * @param pageIndex the page number to return
     * @param pageSize the page size
     * @param tableFilters the filters to apply
     */
    getStudents(sortColumn: string, sortDirection: string, tableFilters: Map<string, TableFilter>):
        Observable<StudentsList> {

        // In a production application, the following logic would be replaced with a REST call!!!

        let studentsCopy: Student[];
        if ((sortDirection === 'desc') || (sortDirection === 'asc')) {
            // Return the students sorted by the specified column and direction
            studentsCopy = this.STUDENTS.slice();
            studentsCopy = studentsCopy.sort(this.compareValues(sortColumn, sortDirection));
        } else {
            // Return the students in no particular order
            studentsCopy = this.STUDENTS.slice();
        }

        // Filter the students
        studentsCopy = studentsCopy.filter(this.filterStudents(tableFilters));
        const total: number = studentsCopy.length;

        const studentsList: StudentsList = { students: studentsCopy, totalStudents: total };

        // Add a 500ms delay to simulate a REST call.
        return of(studentsList).pipe(delay(500));
    }

    /**
     * Returns detail records for the passed in studentId based on the sorting, paging and filtering parameters.
     *
     * @param studentId id of student to be retrieved
     * @param sortColumn the column used to sort the results
     * @param sortDirection the sort direction ('asc' or 'desc')
     * @param pageIndex the page number to return
     * @param pageSize the page size
     */
 

    /**
     * Updates the passed in student and returns the result of the update.
     *
     * @param student the student to update
     */
    updateStudent(student: Student): Observable<Response> {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp: Response = new Response();

        // Get the index of the student that is being updated
        const studentIndex: number = this.STUDENTS.findIndex(s => s.studentId === student.studentId);
        console.log(studentIndex);

        if (studentIndex === 0) {
            // Simulate an error for testing purposes
            rsp.success = false;
            rsp.error = 'Failed to update student, please try again!';
        } else {
            rsp.success = true;

            // Update the student
            this.STUDENTS[studentIndex] = student;
        }

        // Add a 500ms delay to simulate a REST call.
        return of(rsp).pipe(delay(500));
    }

    /**
     * Adds the passed in student and returns the result of the add.
     *
     * @param student the student to add
     */
    addStudent(student: Student): Observable<Response> {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp: Response = new Response();

        if (student.studentSchoolId === 'BAD') {
            // Simulate an error for testing purposes
            rsp.success = false;
            rsp.error = 'Failed to add student, please try again!';
        } else {
            rsp.success = true;

            student.studentId = this.getNextStudentId();

            // Add the student
            this.STUDENTS.push(student);
        }

        // Add a 500ms delay to simulate a REST call.
        return of(rsp).pipe(delay(500));
    }

    /**
     * Deletes the passed in student and returns the result of the delete.
     *
     * @param studentId the studentId of the student to delete
     */
    deleteStudent(studentId: number): Observable<Response> {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp: Response = new Response();

        // Get the index of the student that is being deleted
        const studentIndex: number = this.STUDENTS.findIndex(s => s.studentId === studentId);

        if (studentIndex === 0) {
            // Simulate an error for testing purposes
            rsp.success = false;
            rsp.error = 'Failed to delete student, please try again!';
        } else {
            rsp.success = true;

            // Delete the student
            this.STUDENTS.splice(studentIndex, 1);
        }

        // Add a 500ms delay to simulate a REST call.
        return of(rsp).pipe(delay(500));
    }

    /**
     * Deletes the passed in students and returns the result of the delete.
     *
     * @param studentIds the studentIds of the students to delete
     */
    deleteStudents(studentIds: number[]): Observable<Response> {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp: Response = new Response();
        rsp.success = true;

        studentIds.forEach(studentId => {
            // Get the index of the student that is being delete
            const studentIndex: number = this.STUDENTS.findIndex(s => s.studentId === studentId);

            // Delete the student
            this.STUDENTS.splice(studentIndex, 1);
        });

        // Add a 500ms delay to simulate a REST call.
        return of(rsp).pipe(delay(500));
    }

    /**
     * Returns a response with success=true if the passed in student school id is not assigned to another student.
     *
     * @param studentId the student id that the student school id will be assigned to
     * @param studentSchoolId the student school id to validate
     */
    validateStudentSchoolId(studentId: number, studentSchoolId: string): Observable<Response> {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp: Response = new Response();

        // Get the index of the student that is being validated
        const studentIndex: number = this.STUDENTS.findIndex(s => s.studentId === studentId);

        // Get the index of any student that has the same student school id
        const studentMatchIndex: number = this.STUDENTS.findIndex(s => s.studentSchoolId === studentSchoolId);
        if ((studentMatchIndex !== -1) && (studentMatchIndex !== studentIndex)) {
            rsp.success = false;
            rsp.error = 'Student Id is already assigned';
        } else {
            rsp.success = true;
        }

        // Add a 500ms delay to simulate a REST call.
        return of(rsp).pipe(delay(500));
    }

    /**
     * Returns a function that can be passed to the sort() function to sort values based on the passed in sortColumn and sortDirection.
     *
     * @param sortColumn the column to sort on
     * @param sortDirection the sort direction
     */
    compareValues(sortColumn: string, sortDirection: string) {
        return (a: Student, b: Student) => {
            if (!a.hasOwnProperty(sortColumn) || !b.hasOwnProperty(sortColumn)) {
                return 0;
            }
            const comparison = a[sortColumn].localeCompare(b[sortColumn]);

            return (
                (sortDirection === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    filterStudents(tableFilters: Map<string, TableFilter>) {
        return (student: Student) => {
            // for (const [field,filter] of tableFilters) 
            tableFilters.forEach((filter:TableFilter,field:String) =>
            {
                let testValue: string;
                switch (field) {
                    case 'studentSchoolId':
                        testValue = student.studentSchoolId;
                        break;
                    case 'firstName':
                        testValue = student.firstName;
                        break;
                    case 'lastName':
                        testValue = student.lastName;
                        break;
                    case 'studentEmail':
                        testValue = student.studentEmail;
                        break;
                }

                switch (filter.operator) {
                                   
                    case 'Starts with':
                        if (!testValue.startsWith(filter.value)) {
                            return false;
                        }
                        break;
                    case 'Contains':
                        if (!testValue.includes(filter.value)) {
                            return false;
                        }
                        break;
                    
                    case 'Ends with':
                        if (!testValue.endsWith(filter.value)) {
                            return false;
                        }
                        break;
                }
            });

            return true;
        };
    }

    /**
     * Returns the next available student id.
     */
    getNextStudentId(): number {
        let maxStudentId = 0;
        for (const student of this.STUDENTS) {
            if (maxStudentId < student.studentId) {
                maxStudentId = student.studentId;
            }
        }

        return maxStudentId + 1;
    }
}
