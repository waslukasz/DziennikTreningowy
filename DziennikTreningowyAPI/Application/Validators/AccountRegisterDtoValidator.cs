using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Application.Extensions;
using FluentValidation;

namespace DziennikTreningowyAPI.Application.Validators;

public class AccountRegisterDtoValidator : AbstractValidator<AccountRegisterDto>
{
    public AccountRegisterDtoValidator()
    {
        RuleFor(dto => dto.Email)
            .CustomEmailValidation();
        RuleFor(dto => dto.Password)
            .CustomPasswordValidation();
    }
}