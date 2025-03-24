using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Measurement;

public interface IMeasurementRepository : IGenericRepository<Entities.Measurement>
{
    Task<IEnumerable<Entities.Measurement>> GetAllByProfileAsync(Guid profileId);
}