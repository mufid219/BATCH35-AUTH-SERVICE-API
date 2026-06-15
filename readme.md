## AUTH-SERVICE-API

### 1. Set User APP Password

### 2. Using Model-Generator
* Masuk ke folder model-generator
```bash
cd model-generator
```

* Execute table yang ditarget :



```bash
node .\generate-models.js DEPARTMENT
```

 Usage:
 *   node generate-models.js                    → semua tabel
 *   node generate-models.js DEPARTMENTS        → satu tabel
 *   node generate-models.js DEPARTMENTS EMPLOYEES JOBS  → beberapa tabel


#### Validation Using Model
* Buka file deparment.service.js
  ```javascript
    async create(data) {
        const { valid, errors } = DepartmentModel.validate(data); //use here
        if (!valid) throw new AppError('Validasi gagal', 422, errors);
        
        return DepartmentRepository.create(data);
    }
  ```
  
