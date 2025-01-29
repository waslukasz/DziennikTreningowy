using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Measurment;

public interface IMeasurementRepository : IGenericRepository<Entities.Measurement>
{
    Task<IEnumerable<Entities.Measurement>> GetAllByProfileAsync(Guid profileId);
}