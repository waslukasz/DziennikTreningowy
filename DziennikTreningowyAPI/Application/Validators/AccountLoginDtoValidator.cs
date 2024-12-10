using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Application.Extensions;
using FluentValidation;

namespace DziennikTreningowyAPI.Application.Validators;

public class AccountLoginDtoValidator: AbstractValidator<AccountLoginDto>
{
    public AccountLoginDtoValidator()
    {
        RuleFor(dto => dto.Email)
            .CustomEmailValidation();
        RuleFor(dto => dto.Password)
            .CustomPasswordValidation();
    }
}