const { Loan } = require('../models');

class LoanController {
  static create(req, res, next) {
    const { MemberId, BookId, date_loaned } = req.body;
    Loan.create({ MemberId, BookId, date_loaned })
      .then(function(newLoan) {
        res.status(201).json(newLoan);
      })
      .catch(err => {
        next(err)
      });
  }

  static find(req, res, next) {
    Loan.findAll()
      .then(loans => {
          res.json(loans);
      })
      .catch(err => {
        next(err)
      });
  }

  static returnALoan(req, res, next) {
    const { id } = req.params;
    Loan.findOne({where:{id:id}})
      .then(function(loan) {
        if (!loan) {
          next({ code: 404, resource: 'Loan' });
        } else {
          loan.date_returned = new Date();
          loan.save().then(function() {
            res.json({
              message: 'Successfully returned'
            });
          });
        }
      })
      .catch(function(err) {
        if (err.name === 'CastError') next({ code: 404, resource: 'Loan' })
        else next(err)
      });
  }
}

module.exports = LoanController;
