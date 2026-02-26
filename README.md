# Express Backend Practice

## Day 1
- Basic Express server setup
- Health route
- JSON responses

## Day 2 - Middleware & Error Handling
- Request logger middleware
- Async wrapper for controllers
- Global error handler
- Route parameter validation

### Example Routes

GET /health  
GET /health/:id

### Error Response Format

```json
{
  "status": "error",
  "message": "Error message here"
}